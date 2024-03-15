using System.Reflection;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace EmployeeControl.Infrastructure.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser, ApplicationRole, string>(options), IApplicationDbContext
{
    public DbSet<CompanyHoliday> CompanyHolidays => Set<CompanyHoliday>();

    public DbSet<CategoryAbsence> CategoryAbsences => Set<CategoryAbsence>();

    public DbSet<Company> Companies => Set<Company>();

    public DbSet<CompanySettings> CompanySettings => Set<CompanySettings>();

    public DbSet<CompanyTask> CompanyTasks => Set<CompanyTask>();

    public DbSet<Department> Departments => Set<Department>();

    public DbSet<EmployeeCompanyTask> EmployeeCompanyTasks => Set<EmployeeCompanyTask>();

    public DbSet<EmployeeHoliday> EmployeeHolidays => Set<EmployeeHoliday>();

    public DbSet<EmployeeDepartment> EmployeeDepartments => Set<EmployeeDepartment>();

    public DbSet<EmployeeSettings> EmployeeSettings => Set<EmployeeSettings>();

    public DbSet<TimeControl> TimeControls => Set<TimeControl>();

    public DbSet<WorkDays> WorkDays => Set<WorkDays>();

    public new DatabaseFacade Database => base.Database;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
