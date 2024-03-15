using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeHolidayConfiguration : IEntityTypeConfiguration<EmployeeHoliday>
{
    public void Configure(EntityTypeBuilder<EmployeeHoliday> builder)
    {
        builder.ToTable("EmployeeHolidays");

        // Key.
        builder.HasKey(eh => eh.Id);

        // Indexes.
        builder.HasIndex(eh => eh.Id);

        builder.HasIndex(eh => new { eh.Year, eh.UserId })
            .IsUnique();

        // Properties.
        builder.Property(eh => eh.Year)
            .IsRequired();

        builder.Property(eh => eh.TotalDays)
            .IsRequired();

        builder.Property(eh => eh.Consumed);

        builder.Property(eh => eh.UserId)
            .IsRequired();
    }
}
