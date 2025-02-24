using Domain.Users.Enums;

namespace Domain.Users.Dto;

public record UserDto(
    int Id,
    string? Name,
    string Email,
    int? Age,
    UserRole Role,
    int? AvatarId
);