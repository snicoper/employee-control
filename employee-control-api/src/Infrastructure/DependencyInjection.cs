using System.Text;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models.Settings;
using EmployeeControl.Application.Common.Services;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Infrastructure.Data;
using EmployeeControl.Infrastructure.Data.Interceptors;
using EmployeeControl.Infrastructure.Data.Seeds;
using EmployeeControl.Infrastructure.Services.Common;
using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeControl.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        services.Scan(
            scan =>
                scan.FromCallingAssembly()
                    .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Service") || type.Name.EndsWith("Job")))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());

        services.AddSingleton(TimeProvider.System);
        services.AddScoped<IValidationFailureService, ValidationFailureService>();
        services.AddScoped<IDateTimeService, DateTimeService>();

        var connectionString = configuration.GetConnectionString("DefaultConnection");

        // Interceptors EntityFramework.
        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

        // Db service.
        services.AddDbContext<ApplicationDbContext>(
            (provider, options) =>
            {
                options.AddInterceptors(provider.GetServices<ISaveChangesInterceptor>());
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.UseNpgsql(connectionString);

                if (!environment.IsProduction())
                {
                    options.EnableSensitiveDataLogging();
                }
            });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ApplicationDbContextInitialize>();

        // Hangfire, se ha de crear la db EmployeeControlHangfire manualmente.
        services.AddHangfire(
            config =>
            {
                var hangfireConnectionString = configuration.GetConnectionString("HangfireConnection");

                config.SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
                    .UseSimpleAssemblyNameTypeSerializer()
                    .UseRecommendedSerializerSettings()
                    .UsePostgreSqlStorage(
                        options => options.UseNpgsqlConnection(hangfireConnectionString),
                        new PostgreSqlStorageOptions
                        {
                            InvisibilityTimeout = TimeSpan.FromMinutes(5),
                            QueuePollInterval = TimeSpan.FromMilliseconds(200),
                            DistributedLockTimeout = TimeSpan.FromMinutes(1),
                            PrepareSchemaIfNecessary = true,
                            SchemaName = "public"
                        });
            });

        services.AddHangfireServer();

        services.AddAuthorizationBuilder();

        // Identity.
        services
            .AddIdentityCore<ApplicationUser>()
            .AddRoles<ApplicationRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddClaimsPrincipalFactory<CustomClaimsPrincipalFactory>()
            .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(
            options =>
            {
                // Default Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;

                // Default User settings.
                options.User.RequireUniqueEmail = true;

                // Default SignIn settings.
                options.SignIn.RequireConfirmedAccount = true;
            });

        services.AddAuthentication(
                options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
            .AddJwtBearer(
                options =>
                {
                    var jwtKey = configuration[JwtSettings.JwtKey] ?? string.Empty;
                    var jwtIssuer = configuration[JwtSettings.JwtIssuer];
                    var jwtAudience = configuration[JwtSettings.JwtAudience];

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

        return services;
    }
}
