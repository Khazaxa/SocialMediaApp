using Domain.Users.Commands;
using Domain.Users.Dto;
using Domain.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
[Authorize(Roles = "Admin,User,Employee")]
public class UsersController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [Route("users")]
    public async Task<IQueryable<UserDto>> GetUsers(CancellationToken cancellationToken)
        => await mediator.Send(new UsersGetQuery(), cancellationToken);

    [HttpPut]
    [Route("user")]
    public async Task<Unit> UpdateUser(UserParams user, CancellationToken cancellationToken)
        => await mediator.Send(new UserUpdateCommand(user), cancellationToken);
    
    [HttpGet]
    [Route("user/{name}")]
    public async Task<UserDto> GetUser(string name, CancellationToken cancellationToken)
        => await mediator.Send(new UserGetQuery(name), cancellationToken);

    [HttpGet]
    [Route("userById/{id}")]
    public async Task<UserDto> GetUserById(int id, CancellationToken cancellationToken)
        => await mediator.Send(new UserGetByIdQuery(id), cancellationToken);
}