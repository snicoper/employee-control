using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class WorkingDaysWeekConfiguration : IEntityTypeConfiguration<WorkingDaysWeek>
{
    public void Configure(EntityTypeBuilder<WorkingDaysWeek> builder)
    {
        builder.ToTable("WorkingDaysWeek");

        // Key.
        builder.HasKey(wd => wd.Id);

        // Indexes.
        builder.HasIndex(wd => wd.Id);

        builder.HasIndex(wd => wd.CompanyId)
            .IsUnique();

        // Properties.
        builder.Property(wd => wd.Monday)
            .IsRequired();

        builder.Property(wd => wd.Tuesday)
            .IsRequired();

        builder.Property(wd => wd.Wednesday)
            .IsRequired();

        builder.Property(wd => wd.Thursday)
            .IsRequired();

        builder.Property(wd => wd.Friday)
            .IsRequired();

        builder.Property(wd => wd.Saturday)
            .IsRequired();

        builder.Property(wd => wd.Sunday)
            .IsRequired();

        builder.Property(wd => wd.CompanyId)
            .IsRequired();
    }
}
