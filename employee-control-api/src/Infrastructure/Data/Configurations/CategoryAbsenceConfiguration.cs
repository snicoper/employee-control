using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CategoryAbsenceConfiguration : IEntityTypeConfiguration<CategoryAbsence>
{
    public void Configure(EntityTypeBuilder<CategoryAbsence> builder)
    {
        // Table name.
        builder.ToTable("CategoryAbsences");

        // Primary key.
        builder.HasKey(ca => ca.Id);

        // Indexes.
        builder.HasIndex(ca => ca.Id);

        builder.HasIndex(ca => new { ca.Description })
            .IsUnique();

        // OneToMany.
        builder.HasOne<Company>(ca => ca.Company)
            .WithMany(c => c.CategoryAbsences)
            .HasForeignKey(ca => ca.CompanyId)
            .IsRequired();

        // Properties.
        builder.Property(ca => ca.Description)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(ca => ca.Background)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(ca => ca.Color)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(ca => ca.Active);
    }
}
