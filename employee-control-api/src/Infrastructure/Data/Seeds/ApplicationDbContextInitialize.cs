using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Companies;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Infrastructure.Data.Seeds;

public class ApplicationDbContextInitialize(
    ILogger<ApplicationDbContextInitialize> logger,
    ApplicationDbContext context,
    IDateTimeService dateTimeService,
    ICompanyService companyService,
    UserManager<ApplicationUser> userManager,
    RoleManager<ApplicationRole> roleManager)
{
    public async Task InitialiseAsync()
    {
        try
        {
            await context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    private async Task TrySeedAsync()
    {
        await CreateCompanyCalendarsAsync();
        await CreateCompanyAsync();
        await CreateCompanyTasksAsync();
        await CreateDepartmentsAsync();
        await CreateCategoryAbsencesAsync();
        await CreateRolesAsync();
        await CreateUsersAsync();
    }

    private async Task CreateCompanyCalendarsAsync()
    {
        if (await context.CompanyCalendars.AnyAsync())
        {
            return;
        }

        var companyCalendars = new List<CompanyCalendar>
        {
            new() { Name = "Default", Description = "Calendario por defecto", Default = true },
            new() { Name = "Default 1", Description = "Calendario secundario" }
        };

        context.CompanyCalendars.AddRange(companyCalendars);
        await context.SaveChangesAsync(CancellationToken.None);
    }

    private async Task CreateCategoryAbsencesAsync()
    {
        if (await context.CategoryAbsences.AnyAsync())
        {
            return;
        }

        var company = context.Companies.First();

        var categoryAbsences = new List<CategoryAbsence>
        {
            new()
            {
                Description = "Maternidad",
                Active = true,
                CompanyId = company.Id,
                Background = "#28961f",
                Color = "#ffffff"
            },
            new()
            {
                Description = "Baja laboral",
                Active = true,
                CompanyId = company.Id,
                Background = "#8722d1",
                Color = "#dfedfe"
            }
        };

        context.CategoryAbsences.AddRange(categoryAbsences);
        await context.SaveChangesAsync(CancellationToken.None);
    }

    private async Task CreateDepartmentsAsync()
    {
        if (await context.Departments.AnyAsync())
        {
            return;
        }

        var department = new Department { Name = "IT", Active = true, Background = "#28961f", Color = "#ffffff" };

        context.Departments.Add(department);
        await context.SaveChangesAsync(CancellationToken.None);
    }

    private async Task CreateCompanyTasksAsync()
    {
        if (await context.CompanyTasks.AnyAsync())
        {
            return;
        }

        var companyTask = new CompanyTask { Name = "Agenda", Active = true, Background = "#8722d1", Color = "#dfedfe" };

        context.CompanyTasks.Add(companyTask);
        await context.SaveChangesAsync(CancellationToken.None);
    }

    private async Task CreateCompanyAsync()
    {
        var companies = new List<Company> { new() { Name = "Company test" } };

        foreach (var company in companies.Where(company => !context.Companies.Any(c => c.Name == company.Name)))
        {
            await companyService.CreateAsync(company, "Europe/Madrid", CancellationToken.None);
        }
    }

    private async Task CreateRolesAsync()
    {
        // Default roles.
        var createRole = new List<ApplicationRole>
        {
            new(Roles.Admin), new(Roles.Staff), new(Roles.HumanResources), new(Roles.Employee)
        };

        foreach (var identityRole in createRole.Where(identityRole => roleManager.Roles.All(r => r.Name != identityRole.Name)))
        {
            await roleManager.CreateAsync(identityRole);
        }
    }

    private async Task CreateUsersAsync()
    {
        var company = context.Companies.First();
        var companyCalendar = context.CompanyCalendars.First(cc => cc.Default);

        // Admin user.
        var user = new ApplicationUser
        {
            UserName = "admin@localhost",
            FirstName = "Admin",
            LastName = "Admin1",
            Email = "admin@localhost",
            EntryDate = dateTimeService.UtcNow,
            Active = true,
            EmailConfirmed = true,
            CompanyId = company.Id,
            CompanyCalendarId = companyCalendar.Id
        };

        if (!await userManager.Users.AnyAsync(u => u.Email == user.Email))
        {
            await userManager.CreateAsync(user, "Password4!");

            // Roles.
            var rolesToAdd = new[] { Roles.Admin, Roles.Staff, Roles.HumanResources, Roles.Employee };

            await userManager.AddToRolesAsync(user, rolesToAdd);

            // Settings.
            var settings = new EmployeeSettings { UserId = user.Id, Timezone = "Europe/Madrid" };
            context.EmployeeSettings.Add(settings);
        }

        // EnterpriseStaff user.
        user = new ApplicationUser
        {
            UserName = "snicoper@gmail.com",
            FirstName = "Salvador",
            LastName = "Nicolas",
            Email = "snicoper@gmail.com",
            EntryDate = dateTimeService.UtcNow,
            Active = true,
            EmailConfirmed = true,
            CompanyId = company.Id,
            CompanyCalendarId = companyCalendar.Id
        };

        if (!await userManager.Users.AnyAsync(u => u.Email == user.Email))
        {
            await userManager.CreateAsync(user, "Password4!");

            // Roles de usuario.
            var rolesToAdd = new[] { Roles.Staff, Roles.HumanResources, Roles.Employee };

            await userManager.AddToRolesAsync(user, rolesToAdd);

            // Settings.
            var settings = new EmployeeSettings { UserId = user.Id, Timezone = "Europe/Madrid" };
            context.EmployeeSettings.Add(settings);
        }

        // HumanResources user.
        user = new ApplicationUser
        {
            UserName = "alice@example.com",
            FirstName = "Alice",
            LastName = "Smith",
            Email = "alice@example.com",
            EntryDate = dateTimeService.UtcNow,
            Active = true,
            EmailConfirmed = true,
            CompanyId = company.Id,
            CompanyCalendarId = companyCalendar.Id
        };

        if (!await userManager.Users.AnyAsync(u => u.Email == user.Email))
        {
            await userManager.CreateAsync(user, "Password4!");

            // Roles de usuario.
            var rolesToAdd = new[] { Roles.HumanResources, Roles.Employee };

            await userManager.AddToRolesAsync(user, rolesToAdd);

            // Settings.
            var settings = new EmployeeSettings { UserId = user.Id, Timezone = "Europe/Madrid" };
            context.EmployeeSettings.Add(settings);
        }

        // Employee user.
        user = new ApplicationUser
        {
            UserName = "bob@example.com",
            FirstName = "Bob",
            LastName = "Garcia",
            Email = "bob@example.com",
            EntryDate = dateTimeService.UtcNow,
            Active = true,
            EmailConfirmed = true,
            CompanyId = company.Id,
            CompanyCalendarId = companyCalendar.Id
        };

        if (!await userManager.Users.AnyAsync(u => u.Email == user.Email))
        {
            await userManager.CreateAsync(user, "Password4!");

            // Roles de usuario.
            var rolesToAdd = new[] { Roles.Employee };

            await userManager.AddToRolesAsync(user, rolesToAdd);

            // Settings.
            var settings = new EmployeeSettings { UserId = user.Id, Timezone = "Europe/Madrid" };
            context.EmployeeSettings.Add(settings);
        }

        await context.SaveChangesAsync(CancellationToken.None);
    }
}
