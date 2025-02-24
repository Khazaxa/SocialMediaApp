using Domain.Folders.Commands;
using Domain.Folders.Dto;
using Domain.Folders.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
[Authorize(Roles = "Admin,User,Employee")]
public class FoldersController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("folder")]
    public async Task<Unit> CreateFolder(FolderParams folder, CancellationToken cancellationToken)
        => await mediator.Send(new CreateFolderCommand(folder), cancellationToken);
    
    [HttpGet]
    [Route("folders")]
    public async Task<IEnumerable<FolderDto>> GetFolders(CancellationToken cancellationToken)
        => await mediator.Send(new GetFoldersQuery(), cancellationToken);
    
    [HttpDelete]
    [Route("folder/{id}")]
    public async Task<Unit> DeleteFolder(int id, CancellationToken cancellationToken)
        => await mediator.Send(new DeleteFolderCommand(id), cancellationToken);

}