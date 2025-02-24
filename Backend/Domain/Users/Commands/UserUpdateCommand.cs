using Core.Cqrs;
using Core.Exceptions;
using Domain.Images.Repositories;
using Domain.Users.Dto;
using Domain.Users.Enums;
using Domain.Users.Repositories;
using Domain.Users.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Domain.Users.Commands;

public record UserUpdateCommand(UserParams UserParams) : ICommand<Unit>;

internal class UserUpdateCommandHandler(
    IUserRepository userRepository,
    IImageRepository imageRepository,
    IUserContextService userContext,
    SocialMediaDbContext dbContext
) : ICommandHandler<UserUpdateCommand, Unit>
{
    public async Task<Unit> Handle(UserUpdateCommand command, CancellationToken cancellationToken)
    {
        var loggedUserId = userContext.GetUserId();

        var user = await userRepository.FindAsync(loggedUserId!.Value, cancellationToken)
                   ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound);

        var entry = dbContext.Entry(user);
        if (entry.State == EntityState.Detached)
        {
            dbContext.Attach(user);
        }
        dbContext.Entry(user).State = EntityState.Modified;
        
        user.Update(
            command.UserParams.Name,
            command.UserParams.Age
        );
        
        if (command.UserParams.AvatarId.HasValue)
        {
            var avatar = await imageRepository.FindAsync(command.UserParams.AvatarId.Value, cancellationToken)
                         ?? throw new DomainException("Avatar not found", (int)UserErrorCode.AvatarNotFound);

            user.UpdateAvatar(
                avatar
            );
        }
        
        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}