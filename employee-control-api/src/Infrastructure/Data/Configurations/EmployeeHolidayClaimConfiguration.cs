using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeHolidayClaimConfiguration : IEntityTypeConfiguration<EmployeeHolidayClaim>
{
    public void Configure(EntityTypeBuilder<EmployeeHolidayClaim> builder)
    {
        builder.ToTable("EmployeeHolidayClaims");

        // Key.
        builder.HasKey(ehc => ehc.Id);

        // Indexes.
        builder.HasIndex(ehc => ehc.Id);

        // Properties.
        builder.Property(ehc => ehc.Year)
            .IsRequired();

        builder.Property(ehc => ehc.Description)
            .HasMaxLength(256);

        builder.Property(ehc => ehc.Accepted);

        builder.Property(ehc => ehc.UserId)
            .IsRequired();
    }
}
