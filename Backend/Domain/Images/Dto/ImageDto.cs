namespace Domain.Images.Dto;

public record ImageDto(
    int Id,
    string Name,
    string Extension,
    decimal Size,
    string Path,
    int UserId,
    int? FolderId
);