using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CompanyHolidayConfiguration : IEntityTypeConfiguration<CompanyHoliday>
{
    public void Configure(EntityTypeBuilder<CompanyHoliday> builder)
    {
        builder.ToTable("CompanyHolidays");

        // Key.
        builder.HasKey(ch => ch.Id);

        // Indexes.
        builder.HasIndex(ch => ch.Id);

        builder.HasIndex(ch => new { Day = ch.Date, ch.CompanyId })
            .IsUnique();

        // Properties.
        builder.Property(ch => ch.Date)
            .IsRequired();

        builder.Property(ch => ch.Description)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(ch => ch.CompanyId)
            .IsRequired();
    }
}
