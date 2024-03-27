using EmployeeControl.Application;
using EmployeeControl.Infrastructure;
using EmployeeControl.Infrastructure.Data.Seeds;
using EmployeeControl.WebApi;
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
    app.UseSwaggerUi3(settings => { settings.Path = string.Empty; });
    app.UseReDoc(settings => { settings.Path = "/docs"; });
}

app.UseExceptionHandler(_ => { });

app.UseCors("DefaultCors");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
