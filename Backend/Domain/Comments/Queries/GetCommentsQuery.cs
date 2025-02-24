using Core.Cqrs;
using Domain.Comments.Dto;
using Domain.Comments.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Domain.Comments.Queries;

public record GetCommentsQuery : IQuery<IEnumerable<CommentDto>>;

internal class GetCommentsQueryHandler(
    ICommentRepository commentRepository
) : IQueryHandler<GetCommentsQuery, IEnumerable<CommentDto>>
{
    public async Task<IEnumerable<CommentDto>> Handle(GetCommentsQuery query, CancellationToken cancellationToken)
    {
        var comments = await commentRepository.Query()
            .Include(c => c.Author)
            .Include(c => c.Post)
            .Select((i) => new CommentDto(i.Id, i.Content, i.Author.Name, i.AuthorId, i.PostId))
            .ToListAsync(cancellationToken);

        return comments;
    }
}