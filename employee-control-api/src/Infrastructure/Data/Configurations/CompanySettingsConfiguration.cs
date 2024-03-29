using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CompanySettingsConfiguration : IEntityTypeConfiguration<CompanySettings>
{
    public void Configure(EntityTypeBuilder<CompanySettings> builder)
    {
        builder.ToTable("CompanySettings");

        // Key.
        builder.HasKey(cs => cs.Id);

        // Indexes.
        builder.HasIndex(cs => cs.Id);

        builder.HasIndex(cs => cs.CompanyId)
            .IsUnique();

        // Relations.

        // Properties.
        builder.Property(cs => cs.Timezone)
            .HasMaxLength(50);

        builder.Property(cs => cs.MaximumDailyWorkHours)
            .IsRequired();

        builder.Property(cs => cs.WeeklyWorkingHours)
            .IsRequired();

        builder.Property(cs => cs.GeolocationRequired);

        builder.Property(cs => cs.CompanyId)
            .IsRequired();
    }
}
