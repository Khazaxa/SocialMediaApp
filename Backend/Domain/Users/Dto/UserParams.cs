namespace Domain.Users.Dto;

public record UserParams(
    string? Name,
    int? Age,
    int? AvatarId
);