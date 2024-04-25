using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeHolidayConfiguration : IEntityTypeConfiguration<EmployeeHoliday>
{
    public void Configure(EntityTypeBuilder<EmployeeHoliday> builder)
    {
        // Table name.
        builder.ToTable("EmployeeHolidays");

        // Key.
        builder.HasKey(eh => eh.Id);

        // Indexes.
        builder.HasIndex(eh => eh.Id);

        builder.HasIndex(eh => new { eh.Year, eh.UserId })
            .IsUnique();

        // One-to-Many.
        builder.HasOne<ApplicationUser>(eh => eh.User)
            .WithMany(au => au.EmployeeHolidays)
            .HasForeignKey(eh => eh.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

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
