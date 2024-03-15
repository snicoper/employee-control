using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeCompanyTaskConfiguration : IEntityTypeConfiguration<EmployeeCompanyTask>
{
    public void Configure(EntityTypeBuilder<EmployeeCompanyTask> builder)
    {
        builder.ToTable("EmployeeCompanyTasks");

        // Key.
        builder.HasKey(ect => new { ect.UserId, ect.CompanyTaskId });

        // Indexes.
        builder.HasIndex(ect => new { ect.CompanyId, ect.UserId, ect.CompanyTaskId })
            .IsUnique();

        // Relations.
        builder.HasOne(ect => ect.User)
            .WithMany(au => au.UserCompanyTasks)
            .HasForeignKey(ect => ect.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne(ect => ect.CompanyTask)
            .WithMany(ct => ct.UserCompanyTasks)
            .HasForeignKey(ect => ect.CompanyTaskId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}
