using Domain.Comments.Commands;
using Domain.Comments.Dto;
using Domain.Comments.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
[Authorize(Roles = "Admin,User,Employee")]
public class CommentsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("comment")]
    public async Task<Unit> CreateComment(CommentParams commentParams, CancellationToken cancellationToken)
        => await mediator.Send(new CreateCommentCommand(commentParams), cancellationToken);
    
    [HttpGet]
    [Route("comments")]
    public async Task<IEnumerable<CommentDto>> GetComments(CancellationToken cancellationToken)
        => await mediator.Send(new GetCommentsQuery(), cancellationToken);
    
    [HttpDelete]
    [Route("comment/{id}")]
    public async Task<Unit> DeleteComment(int id, CancellationToken cancellationToken)
        => await mediator.Send(new DeleteCommentCommand(id), cancellationToken);
}