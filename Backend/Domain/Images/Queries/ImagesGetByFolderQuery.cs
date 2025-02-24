using Core.Cqrs;
using Domain.Images.Dto;
using Domain.Images.Repositories;

namespace Domain.Images.Queries;

public record ImagesGetByFolderQuery(int FolderId) : IQuery<IEnumerable<ImageDto>>;

internal class ImagesGetByFolderQueryHandler(
    IImageRepository imageRepository
) : IQueryHandler<ImagesGetByFolderQuery, IEnumerable<ImageDto>>
{
    public async Task<IEnumerable<ImageDto>> Handle(ImagesGetByFolderQuery request, CancellationToken cancellationToken)
    {
        var images = await imageRepository.FindAsync(i => i.FolderId == request.FolderId, cancellationToken);

        return images.Select(image => new ImageDto(
            image.Id,
            image.Name,
            image.Extension,
            image.Size,
            image.Path,
            image.UserId,
            image.FolderId));
    }
}