using Core.Database;
using Domain.Images.Entities;

namespace Domain.Images.Repositories;

internal class ImageRepository(
    IUnitOfWork unitOfWork,
    SocialMediaDbContext dbContext
) : EntityRepositoryBase<Image>(unitOfWork), IImageRepository
{
    public IQueryable<Image> Query()
        => dbContext.Images;
    
    protected override IQueryable<Image> GetQuery()
        => Query();
}