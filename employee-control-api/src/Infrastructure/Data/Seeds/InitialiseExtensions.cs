using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeControl.Infrastructure.Data.Seeds;

public static class InitialiseExtensions
{
    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var initialise = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialize>();

        await initialise.InitialiseAsync();

        await initialise.SeedAsync();
    }
}
