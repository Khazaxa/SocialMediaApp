using Domain.Images.Entities;

namespace Domain.Folders.Dto;

public record FolderDto(
    int id,
    string Name,
    int UserId,
    string UserName,
    Image Logo,
    List<Image> Images
);