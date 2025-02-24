using Core.Cqrs;
using Core.Database;
using Domain.Comments.Dto;
using Domain.Comments.Entities;
using Domain.Comments.Repositories;
using Domain.Users.Services;
using MediatR;

namespace Domain.Comments.Commands;

public record CreateCommentCommand(CommentParams Input) : ICommand<Unit>;

internal class CreateCommentCommandHandler(
    ICommentRepository commentRepository,
    IUserContextService context,
    IUnitOfWork unitOfWork
) : ICommandHandler<CreateCommentCommand, Unit>
{
    public async Task<Unit> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var comment = new Comment(request.Input.PostId, request.Input.Content, context.GetUserId()!.Value);
        
        commentRepository.Add(comment);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}