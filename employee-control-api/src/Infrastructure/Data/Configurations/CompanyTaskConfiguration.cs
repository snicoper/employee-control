using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class CompanyTaskConfiguration : IEntityTypeConfiguration<CompanyTask>
{
    public void Configure(EntityTypeBuilder<CompanyTask> builder)
    {
        builder.ToTable("CompanyTasks");

        // Primary key.
        builder.HasKey(ct => ct.Id);

        // Indexes.
        builder.HasIndex(ct => ct.Id);

        builder.HasIndex(ct => new { ct.Name })
            .IsUnique();

        // Properties.
        builder.Property(ct => ct.Name)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(ct => ct.Background)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(ct => ct.Color)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(ct => ct.Active);
    }
}
