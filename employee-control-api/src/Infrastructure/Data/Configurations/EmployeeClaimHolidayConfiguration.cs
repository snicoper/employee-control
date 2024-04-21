using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeClaimHolidayConfiguration : IEntityTypeConfiguration<EmployeeClaimHoliday>
{
    public void Configure(EntityTypeBuilder<EmployeeClaimHoliday> builder)
    {
        builder.ToTable("EmployeeClaimHolidays");

        // Key.
        builder.HasKey(ech => ech.Id);

        // Indexes.
        builder.HasIndex(ech => ech.Id);

        builder.HasIndex(ech => new { ech.Date, ech.UserId })
            .IsUnique();

        // Properties.
        builder.Property(ech => ech.Date)
            .IsRequired();

        builder.Property(ech => ech.Accepted);

        builder.Property(ech => ech.Description)
            .HasMaxLength(256);

        builder.Property(ech => ech.UserId)
            .IsRequired();
    }
}
