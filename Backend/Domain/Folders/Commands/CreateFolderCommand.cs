using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Folders.Dto;
using Domain.Folders.Entities;
using Domain.Folders.Enums;
using Domain.Folders.Repositories;
using Domain.Images.Entities;
using Domain.Images.Enums;
using Domain.Images.Repositories;
using Domain.Users.Enums;
using Domain.Users.Services;
using MediatR;

namespace Domain.Folders.Commands;

public record CreateFolderCommand(FolderParams Folder) : ICommand<Unit>;

internal class CreateFolderCommandHandler(
    IFolderRepository folderRepository,
    IImageRepository imageRepository,
    IUserContextService userContext,
    IUnitOfWork unitOfWork
) : ICommandHandler<CreateFolderCommand, Unit>
{
    public async Task<Unit> Handle(CreateFolderCommand command, CancellationToken cancellationToken)
    {
        if (await folderRepository.AnyAsync(f => f.Name == command.Folder.Name, cancellationToken))
            throw new DomainException("Folder already exists", (int)FolderErrorCode.FolderExists);

        Image? logoImage = null;
        if (command.Folder.LogoId.HasValue)
            logoImage = await imageRepository.FindAsync(command.Folder.LogoId.Value, cancellationToken)
                        ?? throw new DomainException("Logo not found", (int)ImageErrorCode.ImageNotFound);

        var folder = new Folder(
            command.Folder.Name ?? throw new DomainException("Name is required", (int)FolderErrorCode.NameIsRequired),
            logoImage?.Id,
            userContext.GetUserId() ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound)
        );

        folderRepository.Add(folder);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return await Unit.Task;
    }
}