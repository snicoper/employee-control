﻿using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeDepartmentConfiguration : IEntityTypeConfiguration<EmployeeDepartment>
{
    public void Configure(EntityTypeBuilder<EmployeeDepartment> builder)
    {
        builder.ToTable("EmployeeDepartments");

        // Key.
        builder.HasKey(ed => new { ed.UserId, ed.DepartmentId });

        // Indexes.
        builder.HasIndex(ed => new { ed.UserId, ed.DepartmentId, ed.CompanyId });

        // Relations.
        builder.HasOne(ed => ed.User)
            .WithMany(au => au.UserDepartments)
            .HasForeignKey(ed => ed.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne(ed => ed.Department)
            .WithMany(d => d.UserDepartments)
            .HasForeignKey(ed => ed.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}
