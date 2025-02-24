using Core.Database;
using Domain.Folders.Entities;
using Domain.Users.Services;

namespace Domain.Folders.Repositories;

internal class FolderRepository(IUnitOfWork unitOfWork,
    SocialMediaDbContext dbContext,
    IUserContextService userContext
) : EntityRepositoryBase<Folder>(unitOfWork), IFolderRepository
{
    public IQueryable<Folder> Query()
        => dbContext.Folders.AsQueryable();
    
    protected override IQueryable<Folder> GetQuery()
    {
        return Query().
                Where(x => x.UserId == userContext.GetUserId()
                );
    }
}