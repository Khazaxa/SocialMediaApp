using Core.Cqrs;
using Domain.Folders.Dto;
using Domain.Folders.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Domain.Folders.Queries;

public record GetFoldersQuery() : IQuery<IEnumerable<FolderDto>>;

internal class GetFoldersQueryHandler(
    IFolderRepository folderRepository
) : IQueryHandler<GetFoldersQuery, IEnumerable<FolderDto>>
{
    public async Task<IEnumerable<FolderDto>> Handle(GetFoldersQuery request, CancellationToken cancellationToken)
    {
        return await folderRepository.Query()
            .Include(x => x.Logo)
            .Include(x => x.Images)
            .Include(x => x.User)
            .Select(f => new FolderDto(
                f.Id,
                f.Name,
                f.UserId,
                f.User.Name,
                f.Logo,
                f.Images
                ))
            .ToListAsync(cancellationToken);
    }
}