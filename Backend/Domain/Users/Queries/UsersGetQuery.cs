using Core.Cqrs;
using Domain.Users.Dto;
using Domain.Users.Repositories;

namespace Domain.Users.Queries;

public record UsersGetQuery : IQuery<IQueryable<UserDto>>;

internal class UsersGetQueryHandler(
    IUserRepository userRepository
) : IQueryHandler<UsersGetQuery, IQueryable<UserDto>>
{
    public async Task<IQueryable<UserDto>> Handle(UsersGetQuery query, CancellationToken cancellationToken)
    {
        var users = userRepository.Query()
            .Select(x => new UserDto(
                x.Id,
                x.Name,
                x.Email,
                x.Age,
                x.Role,
                x.AvatarImageId
            ));

        return await Task.FromResult(users);
    }
}