using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.WebApi.Infrastructure;
using EmployeeControl.WebApi.Services;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Versioning;
using NSwag;
using NSwag.Generation.Processors.Security;
using ZymLabs.NSwag.FluentValidation;

namespace EmployeeControl.WebApi;

public static class DependencyInjection
{
    public static IServiceCollection AddWebApiServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();
        services.AddHttpContextAccessor();

        services.Scan(
            scan =>
                scan.FromCallingAssembly()
                    .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Service")))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());

        services.AddScoped<ICurrentUserService, CurrentUserService>();

        // FluentValidation.
        services.AddScoped(
            provider =>
            {
                var validationRules = provider.GetService<IEnumerable<FluentValidationRule>>();
                var loggerFactory = provider.GetService<ILoggerFactory>();

                return new FluentValidationSchemaProcessor(provider, validationRules, loggerFactory);
            });

        // API versioning.
        services.AddApiVersioning(
            options =>
            {
                options.ReportApiVersions = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.ApiVersionReader = new UrlSegmentApiVersionReader();
            });

        services.AddExceptionHandler<CustomExceptionHandler>();

        services.AddControllersWithViews()
            .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
            .AddDataAnnotationsLocalization();

        services.AddEndpointsApiExplorer();
        services.AddRazorPages();

        // NSwag.
        services.AddOpenApiDocument(
            (configure, sp) =>
            {
                configure.Title = "Employee Control API";

                // Add the fluent validations schema processor.
                var fluentValidationSchemaProcessor =
                    sp.CreateScope().ServiceProvider.GetRequiredService<FluentValidationSchemaProcessor>();

                configure.SchemaSettings.SchemaProcessors.Add(fluentValidationSchemaProcessor);

                // Add JWT.
                configure.AddSecurity(
                    "JWT",
                    Enumerable.Empty<string>(),
                    new OpenApiSecurityScheme
                    {
                        Type = OpenApiSecuritySchemeType.ApiKey,
                        Name = "Authorization",
                        In = OpenApiSecurityApiKeyLocation.Header,
                        Description = "Type into the text box: Bearer {your JWT token}."
                    });

                configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });

        // Customize default API behavior.
        services.Configure<ApiBehaviorOptions>(
            options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

        // Routing.
        services.AddRouting(options => { options.LowercaseUrls = true; });

        // Cors.
        services.AddCors(
            options =>
            {
                options.AddPolicy(
                    "DefaultCors",
                    builder =>
                    {
                        builder
                            .WithOrigins("http://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

        services.Configure<RazorViewEngineOptions>(
            options =>
            {
                options.ViewLocationFormats.Clear();
                options.ViewLocationFormats.Add("/Views/{1}/{0}" + RazorViewEngine.ViewExtension);
                options.ViewLocationFormats.Add("/Views/Emails/{0}" + RazorViewEngine.ViewExtension);
                options.ViewLocationFormats.Add("/Views/Shared/{0}" + RazorViewEngine.ViewExtension);
            });

        // Culture.
        services.Configure<RequestLocalizationOptions>(
            options =>
            {
                options.DefaultRequestCulture = new RequestCulture(AppCultures.DefaultCulture);
                options.SupportedCultures = AppCultures.GetAll();
                options.SupportedUICultures = AppCultures.GetAll();
            });

        // Localization.
        services.AddLocalization(options => { options.ResourcesPath = "Resources"; });

        return services;
    }
}
