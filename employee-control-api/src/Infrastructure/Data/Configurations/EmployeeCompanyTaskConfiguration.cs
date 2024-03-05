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
        builder.HasKey(uct => new { uct.UserId, uct.CompanyTaskId });

        // Indexes.
        builder.HasIndex(uct => new { uct.CompanyId, uct.UserId, uct.CompanyTaskId })
            .IsUnique();

        // Relations.
        builder.HasOne(uct => uct.User)
            .WithMany(au => au.UserCompanyTasks)
            .HasForeignKey(uct => uct.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne(uct => uct.CompanyTask)
            .WithMany(ct => ct.UserCompanyTasks)
            .HasForeignKey(uct => uct.CompanyTaskId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}
