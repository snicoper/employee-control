using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeHolidayClaimLineConfiguration : IEntityTypeConfiguration<EmployeeHolidayClaimLine>
{
    public void Configure(EntityTypeBuilder<EmployeeHolidayClaimLine> builder)
    {
        // Table name.
        builder.ToTable("EmployeeHolidayClaimLines");

        // Key.
        builder.HasKey(ehcl => ehcl.Id);

        // Indexes.
        builder.HasIndex(ehcl => ehcl.Id);

        builder.HasIndex(ehcl => new { ehcl.Date, ehcl.UserId })
            .IsUnique();

        // One-to-Many.
        builder.HasOne<ApplicationUser>(ehcl => ehcl.User)
            .WithMany(au => au.EmployeeHolidayClaimLines)
            .HasForeignKey(ehcl => ehcl.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne<EmployeeHolidayClaim>(ehcl => ehcl.EmployeeHolidayClaim)
            .WithMany(au => au.EmployeeHolidayClaimLines)
            .HasForeignKey(ehcl => ehcl.EmployeeHolidayClaimId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Properties.
        builder.Property(ehcl => ehcl.Date)
            .IsRequired();

        builder.Property(ehcl => ehcl.UserId)
            .IsRequired();

        builder.Property(ehcl => ehcl.EmployeeHolidayClaimId)
            .IsRequired();
    }
}
