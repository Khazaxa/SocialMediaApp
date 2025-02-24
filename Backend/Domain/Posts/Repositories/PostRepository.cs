using Core.Database;
using Domain.Posts.Entities;

namespace Domain.Posts.Repositories;

internal class PostRepository(
    IUnitOfWork unitOfWork,
    SocialMediaDbContext dbContext
) : EntityRepositoryBase<Post>(unitOfWork), IPostRepository
{
    protected override IQueryable<Post> GetQuery()
    => dbContext.Posts.AsQueryable();

    public IQueryable<Post> Query()
        => dbContext.Posts.AsQueryable();
}