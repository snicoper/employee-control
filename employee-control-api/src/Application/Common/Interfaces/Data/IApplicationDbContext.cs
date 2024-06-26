﻿using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace EmployeeControl.Application.Common.Interfaces.Data;

public interface IApplicationDbContext
{
    DbSet<CategoryAbsence> CategoryAbsences { get; }

    DbSet<Company> Companies { get; }

    DbSet<CompanyCalendar> CompanyCalendars { get; }

    DbSet<CompanyCalendarHoliday> CompanyCalendarHoliday { get; }

    DbSet<CompanySettings> CompanySettings { get; }

    DbSet<CompanyTask> CompanyTasks { get; }

    DbSet<Department> Departments { get; }

    DbSet<EmployeeCompanyTask> EmployeeCompanyTasks { get; }

    DbSet<EmployeeDepartment> EmployeeDepartments { get; }

    DbSet<EmployeeHolidayClaim> EmployeeHolidaysClaims { get; }

    DbSet<EmployeeHolidayClaimLine> EmployeeHolidaysClaimLines { get; }

    DbSet<EmployeeHoliday> EmployeeHolidays { get; }

    DbSet<EmployeeSettings> EmployeeSettings { get; }

    DbSet<TimeControl> TimeControls { get; }

    DbSet<WorkingDaysWeek> WorkingDaysWeek { get; }

    DatabaseFacade Database { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
