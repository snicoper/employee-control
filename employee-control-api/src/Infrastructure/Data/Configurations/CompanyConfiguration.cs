using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.ToTable("Companies");

        // Primary key.
        builder.HasKey(c => c.Id);

        // Indexes.
        builder.HasIndex(c => c.Id);

        builder.HasIndex(c => c.Name)
            .IsUnique();

        // Properties.
        builder.Property(c => c.Name)
            .HasMaxLength(256)
            .IsRequired();
    }
}
