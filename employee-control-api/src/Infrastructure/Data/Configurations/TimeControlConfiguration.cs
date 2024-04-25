using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class TimeControlConfiguration : IEntityTypeConfiguration<TimeControl>
{
    public void Configure(EntityTypeBuilder<TimeControl> builder)
    {
        // Table name.
        builder.ToTable("TimeControls");

        // Key.
        builder.HasKey(tc => tc.Id);

        // Indexes.
        builder.HasIndex(tc => tc.Id);

        // One-to-Many.
        builder.HasOne<ApplicationUser>(tc => tc.User)
            .WithMany(au => au.TimeControls)
            .HasForeignKey(tc => tc.UserId)
            .IsRequired();

        // Properties
        builder.Property(tc => tc.Start)
            .IsRequired();

        builder.Property(tc => tc.Finish)
            .IsRequired();

        builder.Property(tc => tc.Incidence);

        builder.Property(tc => tc.IncidenceDescription)
            .HasMaxLength(256);

        builder.Property(tc => tc.ClosedBy)
            .IsRequired();

        builder.Property(tc => tc.TimeState)
            .IsRequired();

        builder.Property(tc => tc.DeviceTypeStart)
            .IsRequired();

        builder.Property(tc => tc.DeviceTypeFinish);

        builder.Property(tc => tc.LatitudeStart);

        builder.Property(tc => tc.LongitudeStart);

        builder.Property(tc => tc.LatitudeFinish);

        builder.Property(tc => tc.LongitudeFinish);

        builder.Property(tc => tc.UserId)
            .IsRequired();
    }
}
