using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Data.Configurations
{
	internal class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.HasKey(u => u.Id);

			builder.Property(u => u.Email)
				.IsRequired()
				.HasMaxLength(256);

			builder.HasIndex(u => u.Email).IsUnique();

			builder.Property(u => u.FirstName)
				.IsRequired()
				.HasMaxLength(50);

			builder.Property(u => u.LastName)
				.IsRequired()
				.HasMaxLength(50);

			builder.HasMany(u => u.Projects)
				.WithOne(p => p.User)
				.HasForeignKey(p => p.UserId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
