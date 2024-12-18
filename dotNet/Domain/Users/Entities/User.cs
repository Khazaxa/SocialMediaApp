using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using Core.Database;
using Domain.Images.Entities;
using Domain.Posts.Entities;
using Domain.Users.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.Users.Entities;

public class User : EntityBase
{
    public const int EmailMaxLength = 64;
    public const int NameMaxLength = 64;

    private User()
    {
    }

    public User(string? name, string email, int? age, byte[] passwordHash, byte[] passwordSalt, UserRole role)
    {
        Update(name, age);
        Email = email;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
        Role = role;
    }

    [MaxLength(NameMaxLength)] public string? Name { get; private set; }
    [MaxLength(EmailMaxLength)] public string Email { get; private set; }
    public int? Age { get; private set; }
    public byte[] PasswordHash { get; private set; } = null!;
    public byte[] PasswordSalt { get; private set; } = null!;
    public UserRole Role { get; private set; }
    public List<Post> Posts { get; private set; } = new();
    public List<Comment> Comments { get; private set; } = new();

    public void Update(string? name, int? age)
    {
        Name = name;
        Age = age;
    }

    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>()
            .HasIndex(x => x.Email)
            .IsUnique();
        builder.Entity<User>()
            .HasMany<Image>()
            .WithOne()
            .HasForeignKey(x => x.UserId);

        using var hmac = new HMACSHA512();
        var user = new User
        {
            Id = 1,
            Name = "User",
            Email = "user@example.com",
            Role = UserRole.Admin,
            PasswordHash = hmac.ComputeHash("Password123$d"u8.ToArray()),
            PasswordSalt = hmac.Key
        };

        builder.Entity<User>().HasData(user);

        builder.Entity<User>()
            .HasMany<Post>()
            .WithOne()
            .HasForeignKey(x => x.AuthorId);

        builder.Entity<User>()
            .HasMany<Comment>()
            .WithOne()
            .HasForeignKey(x => x.AuthorId);
    }
}