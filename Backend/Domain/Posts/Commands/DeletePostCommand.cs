using Core.Cqrs;
using Core.Database;
using Domain.Posts.Repositories;
using MediatR;

namespace Domain.Posts.Commands;

public record DeletePostCommand(int Id) : ICommand<Unit>;

internal class DeletePostCommandHandler(
    IPostRepository postRepository,
    IUnitOfWork unitOfWork
) : ICommandHandler<DeletePostCommand, Unit>
{
    public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
    {
        var post = await postRepository.FindAsync(request.Id, cancellationToken);

        postRepository.Delete(post);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}