using Azure.Storage.Blobs;
using Core.Configuration.Config.Azure;
using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Images.Entities;
using Domain.Images.Enums;
using Domain.Images.Repositories;
using Domain.Users.Enums;
using Domain.Users.Services;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Domain.Images.Commands;

public record ImageUploadCommand(IFormFile File) : ICommand<Unit>;

internal class ImageUploadCommandHandler(
    IImageRepository imageRepository,
    IUnitOfWork unitOfWork,
    IAzureConfig azureConfig,
    IUserContextService userContext
) : ICommandHandler<ImageUploadCommand, Unit>
{
    public async Task<Unit> Handle(ImageUploadCommand input, CancellationToken cancellationToken)
    {
        var connectionString = azureConfig.StorageConnectionString;
        var blobServiceClient = new BlobServiceClient(connectionString);
        var containerName = azureConfig.BlobContainerName;
        var containerClient = blobServiceClient.GetBlobContainerClient(containerName);

        await containerClient.CreateIfNotExistsAsync(cancellationToken: cancellationToken);

        var blobClient = containerClient.GetBlobClient(input.File.FileName);
        if (await blobClient.ExistsAsync(cancellationToken))
            throw new DomainException("Provided image already exists", (int)ImageErrorCode.ImageAlreadyExists);

        await blobClient.UploadAsync(input.File.OpenReadStream(), cancellationToken);

        var image = new Image(
            input.File.FileName,
            input.File.ContentType.Split('/')[1],
            input.File.Length,
            blobClient.Uri.ToString(),
            userContext.GetUserId() ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound)
        );

        imageRepository.Add(image);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}