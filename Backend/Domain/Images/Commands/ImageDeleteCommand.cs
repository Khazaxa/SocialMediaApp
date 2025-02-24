using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Images.Enums;
using Domain.Images.Repositories;
using Domain.Users.Services;
using MediatR;

namespace Domain.Images.Commands;

public record ImageDeleteCommand(int Id) : ICommand<Unit>;

internal class ImageDeleteCommandHandler(
    IImageRepository imgRepository,
    IUnitOfWork unitOfWork,
    IUserContextService userContext
) : ICommandHandler<ImageDeleteCommand, Unit>
{
    public async Task<Unit> Handle(ImageDeleteCommand command, CancellationToken cancellationToken)
    {
        var userId = userContext.GetUserId();
        var img = await imgRepository.FindAsync(command.Id, cancellationToken);
        
        if (img.UserId != userId)
            throw new DomainException("You are not allowed to delete this image", (int)ImageErrorCode.NotAllowed);
        
        imgRepository.Delete(img);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}