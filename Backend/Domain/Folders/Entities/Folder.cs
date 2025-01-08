using Core.Database;
using Domain.Images.Entities;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Folders.Entities;

public class Folder : EntityBase
{
    private Folder() { }

    public Folder(string name, int? logoId, int userId)
    {
        Name = name;
        LogoId = logoId;
        UserId = userId;
        Images = new List<Image>();
    }

    public string Name { get; private set; }
    public int? LogoId { get; private set; }
    public Image? Logo { get; private set; }
    public List<Image> Images { get; private set; }
    public int UserId { get; private set; }
    public User User { get; private set; }

    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Folder>().HasIndex(x => x.Name).IsUnique();
        builder.Entity<Folder>()
            .HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId);
        builder.Entity<Folder>()
            .HasMany(x => x.Images)
            .WithOne(x => x.Folder)
            .HasForeignKey(x => x.FolderId);
        builder.Entity<Folder>()
            .HasOne(x => x.Logo)
            .WithMany()
            .HasForeignKey(x => x.LogoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}