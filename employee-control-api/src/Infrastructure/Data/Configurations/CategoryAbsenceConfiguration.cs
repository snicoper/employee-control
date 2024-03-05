using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CategoryAbsenceConfiguration : IEntityTypeConfiguration<CategoryAbsence>
{
    public void Configure(EntityTypeBuilder<CategoryAbsence> builder)
    {
        builder.ToTable("CategoryAbsences");

        // Primary key.
        builder.HasKey(c => c.Id);

        // Indexes.
        builder.HasIndex(c => c.Id);

        builder.HasIndex(c => new { c.Description, c.CompanyId })
            .IsUnique();

        // Properties.
        builder.Property(c => c.Description)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(d => d.Background)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(d => d.Color)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(d => d.Active);

        builder.Property(c => c.CompanyId)
            .IsRequired();
    }
}
