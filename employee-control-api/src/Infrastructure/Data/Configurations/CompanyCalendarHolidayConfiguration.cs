using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CompanyCalendarHolidayConfiguration : IEntityTypeConfiguration<CompanyCalendarHoliday>
{
    public void Configure(EntityTypeBuilder<CompanyCalendarHoliday> builder)
    {
        // Table name.
        builder.ToTable("CompanyCalendarHolidays");

        // Key.
        builder.HasKey(ch => ch.Id);

        // Indexes.
        builder.HasIndex(ch => ch.Id);

        builder.HasIndex(ch => new { Day = ch.Date })
            .IsUnique();

        builder.HasIndex(ch => new { Day = ch.Description })
            .IsUnique();

        // One-to-Many.
        builder.HasOne<CompanyCalendar>(cch => cch.CompanyCalendar)
            .WithMany(cc => cc.CompanyCalendarHolidays)
            .HasForeignKey(cch => cch.CompanyCalendarId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Properties.
        builder.Property(ch => ch.Date)
            .IsRequired();

        builder.Property(ch => ch.Description)
            .IsRequired()
            .HasMaxLength(50);
    }
}
