using Domain.Images.Commands;
using Domain.Images.Dto;
using Domain.Images.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
[Authorize(Roles = "Admin,User,Employee")]
public class ImagesController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("upload")]
    public async Task<Unit> UploadImage(IFormFile file, CancellationToken cancellationToken)
        => await mediator.Send(new ImageUploadCommand(file), cancellationToken);
    
    [HttpGet]
    [Route("images")]
    public async Task<IEnumerable<ImageDto>> GetImages(CancellationToken cancellationToken)
        => await mediator.Send(new ImagesGetQuery(), cancellationToken);
    
    [HttpDelete]
    [Route("image/{id}")]
    public async Task<Unit> DeleteImage(int id, CancellationToken cancellationToken)
        => await mediator.Send(new ImageDeleteCommand(id), cancellationToken);
    
    [HttpGet]
    [Route("image/{id}")]
    public async Task<ImageDto> GetImage(int id, CancellationToken cancellationToken)
    => await mediator.Send(new ImageGetQuery(id), cancellationToken);
    
    [HttpGet]
    [Route("imageByFolder/{folderId}")]
    public async Task<IEnumerable<ImageDto>> GetImagesByFolder(int folderId, CancellationToken cancellationToken)
        => await mediator.Send(new ImagesGetByFolderQuery(folderId), cancellationToken);

    [HttpPut]
    [Route("assignToFolder")]
    public async Task<Unit> AssignImagesToFolder(List<int> imageIds, int folderId,
        CancellationToken cancellationToken)
        => await mediator.Send(new ImagesAssignCommand(imageIds, folderId), cancellationToken);
}

