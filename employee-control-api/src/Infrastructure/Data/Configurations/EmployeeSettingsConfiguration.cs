using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeSettingsConfiguration : IEntityTypeConfiguration<EmployeeSettings>
{
    public void Configure(EntityTypeBuilder<EmployeeSettings> builder)
    {
        builder.ToTable("EmployeeSettings");

        // Key.
        builder.HasIndex(e => e.Id);

        // Indexes
        builder.HasIndex(e => e.UserId)
            .IsUnique();

        // Properties.
        builder.Property(e => e.Timezone)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(e => e.UserId)
            .IsRequired();
    }
}
