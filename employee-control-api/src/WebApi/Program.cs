using EmployeeControl.Application;
using EmployeeControl.Application.Common.Interfaces.BackgroundJobs;
using EmployeeControl.Application.Common.Services.Hubs;
using EmployeeControl.Infrastructure;
using EmployeeControl.Infrastructure.Data.Seeds;
using EmployeeControl.WebApi;
using Hangfire;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddApplicationServices(builder.Configuration)
    .AddInfrastructureServices(builder.Configuration, builder.Environment)
    .AddWebApiServices();

builder
    .Host
    .UseSerilog(
        (hostingContext, loggerConfiguration) =>
        {
            loggerConfiguration
                .ReadFrom.Configuration(hostingContext.Configuration)
                .Enrich.FromLogContext()
                .WriteTo.Console(
                    outputTemplate:
                    "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}",
                    theme: AnsiConsoleTheme.Literate);

            if (!hostingContext.HostingEnvironment.IsDevelopment())
            {
                loggerConfiguration.WriteTo.File("web_api_log.txt", rollingInterval: RollingInterval.Day);
            }
        });

var app = builder.Build();

// Initialise Database in development.
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseSerilogRequestLogging();

app.UseRequestLocalization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // NSwag.
    app.UseOpenApi();
    app.UseSwaggerUi(settings => { settings.Path = string.Empty; });
    app.UseReDoc(settings => { settings.Path = "/docs"; });
}

app.UseExceptionHandler(_ => { });

app.UseCors("DefaultCors");

app.UseAuthentication();
app.UseAuthorization();

// Hangfire.
app.UseHangfireDashboard();
RecurringJob.AddOrUpdate<ICloseTimeControlJob>("close-time-control-job", service => service.Process(), "*/30 * * * *");

app.MapControllers();

// Configure our SignalR hub
app.MapHub<NotificationTimeControlIncidenceHub>("hub");

app.Run();
