using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeHolidayClaimLineConfiguration : IEntityTypeConfiguration<EmployeeHolidayClaimLine>
{
    public void Configure(EntityTypeBuilder<EmployeeHolidayClaimLine> builder)
    {
        builder.ToTable("EmployeeHolidayClaimLines");

        // Key.
        builder.HasKey(ehcl => ehcl.Id);

        // Indexes.
        builder.HasIndex(ehcl => ehcl.Id);

        builder.HasIndex(ehcl => new { ehcl.Date, ehcl.UserId })
            .IsUnique();

        // Properties.
        builder.Property(ehcl => ehcl.Date)
            .IsRequired();

        builder.Property(ehcl => ehcl.UserId)
            .IsRequired();

        builder.Property(ehcl => ehcl.EmployeeHolidayClaimId)
            .IsRequired();
    }
}
