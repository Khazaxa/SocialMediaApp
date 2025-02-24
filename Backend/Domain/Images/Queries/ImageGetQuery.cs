using Core.Cqrs;
using Domain.Images.Dto;
using Domain.Images.Repositories;

namespace Domain.Images.Queries;

public record ImageGetQuery(int Id) : IQuery<ImageDto>;

internal class ImageGetQueryHandler(
    IImageRepository imageRepository
) : IQueryHandler<ImageGetQuery, ImageDto>
{
    public async Task<ImageDto> Handle(ImageGetQuery request, CancellationToken cancellationToken)
    {
        var image = await imageRepository.FindAsync(request.Id, cancellationToken);
        return new ImageDto(
            image.Id,
            image.Name,
            image.Extension,
            image.Size,
            image.Path,
            image.UserId,
            image.FolderId
            );
    }
}