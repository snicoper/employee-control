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
    public DbSet<CompanyCalendarHoliday> CompanyCalendarHoliday => Set<CompanyCalendarHoliday>();

    public DbSet<CategoryAbsence> CategoryAbsences => Set<CategoryAbsence>();

    public DbSet<Company> Companies => Set<Company>();

    public DbSet<CompanyCalendar> CompanyCalendars => Set<CompanyCalendar>();

    public DbSet<CompanySettings> CompanySettings => Set<CompanySettings>();

    public DbSet<CompanyTask> CompanyTasks => Set<CompanyTask>();

    public DbSet<Department> Departments => Set<Department>();

    public DbSet<EmployeeCompanyTask> EmployeeCompanyTasks => Set<EmployeeCompanyTask>();

    public DbSet<EmployeeDepartment> EmployeeDepartments => Set<EmployeeDepartment>();

    public DbSet<EmployeeHolidayClaimLine> EmployeeHolidaysClaimLines => Set<EmployeeHolidayClaimLine>();

    public DbSet<EmployeeHolidayClaim> EmployeeHolidaysClaims => Set<EmployeeHolidayClaim>();

    public DbSet<EmployeeHoliday> EmployeeHolidays => Set<EmployeeHoliday>();

    public DbSet<EmployeeSettings> EmployeeSettings => Set<EmployeeSettings>();

    public DbSet<TimeControl> TimeControls => Set<TimeControl>();

    public DbSet<WorkingDaysWeek> WorkingDaysWeek => Set<WorkingDaysWeek>();

    public new DatabaseFacade Database => base.Database;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
