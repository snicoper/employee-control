using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeControl.Infrastructure.Data.Configurations;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        // Indexes.
        builder.HasIndex(au => au.Email)
            .IsUnique();

        builder.HasIndex(au => au.RefreshToken)
            .IsUnique();

        // One-to-One.
        builder.HasOne<EmployeeSettings>(au => au.EmployeeSettings)
            .WithOne(es => es.User)
            .HasForeignKey<EmployeeSettings>(es => es.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // One-to-Many.
        builder.HasOne<Company>(au => au.Company)
            .WithMany(c => c.Users)
            .HasForeignKey(au => au.CompanyId)
            .IsRequired();

        builder.HasOne<CompanyCalendar>(au => au.CompanyCalendar)
            .WithMany(cc => cc.Users)
            .HasForeignKey(au => au.CompanyCalendarId);

        // Many-to-Many.
        builder.HasMany(au => au.UserRoles)
            .WithOne()
            .HasForeignKey(uc => uc.UserId)
            .IsRequired();

        // Properties.
        builder.Property(au => au.Email)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(au => au.FirstName)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(au => au.LastName)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(au => au.RefreshToken)
            .HasMaxLength(256);

        builder.Property(au => au.EntryDate)
            .IsRequired();

        builder.Property(au => au.RefreshTokenExpiryTime);
    }
}
