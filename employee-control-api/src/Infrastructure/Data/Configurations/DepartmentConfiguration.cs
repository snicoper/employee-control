using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
{
    public void Configure(EntityTypeBuilder<Department> builder)
    {
        builder.ToTable("Departments");

        // Key.
        builder.HasKey(d => d.Id);

        // Indexes.
        builder.HasIndex(d => d.Id);

        builder.HasIndex(d => new { d.Name })
            .IsUnique();

        builder.HasIndex(d => d.Name);

        // Properties.
        builder.Property(d => d.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(d => d.Background)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(d => d.Color)
            .IsRequired()
            .HasMaxLength(7);
    }
}
