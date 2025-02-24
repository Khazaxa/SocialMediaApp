using Core.Cqrs;
using Domain.Images.Dto;
using Domain.Images.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Domain.Images.Queries;

public record ImagesGetQuery : IQuery<List<ImageDto>>;

internal class ImagesGetQueryHandler(
    IImageRepository imgRepository
) : IQueryHandler<ImagesGetQuery, List<ImageDto>>
{

    public async Task<List<ImageDto>> Handle(ImagesGetQuery request, CancellationToken cancellationToken)
    {
        var images = imgRepository.Query()
            .Select((i) => new ImageDto(i.Id, i.Name, i.Extension, i.Size, i.Path, i.UserId, i.FolderId))
            .ToListAsync(cancellationToken);
        return await images;
    }
}