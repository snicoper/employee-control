using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class EmployeeSettingsConfiguration : IEntityTypeConfiguration<EmployeeSettings>
{
    public void Configure(EntityTypeBuilder<EmployeeSettings> builder)
    {
        // Table name.
        builder.ToTable("EmployeeSettings");

        // Key.
        builder.HasIndex(es => es.Id);

        // Indexes
        builder.HasIndex(es => es.UserId)
            .IsUnique();

        // Properties.
        builder.Property(es => es.Timezone)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(es => es.UserId)
            .IsRequired();
    }
}
