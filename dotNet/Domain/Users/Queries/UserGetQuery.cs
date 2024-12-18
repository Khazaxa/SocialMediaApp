using Core.Cqrs;
using Core.Exceptions;
using Domain.Users.Dtos;
using Domain.Users.Enums;
using Domain.Users.Repositories;

namespace Domain.Users.Queries;

public record UserGetQuery(string Name) : IQuery<UserDto>;

internal class UserGetQueryHandler(IUserRepository userRepository) : IQueryHandler<UserGetQuery, UserDto>
{
    public async Task<UserDto> Handle(UserGetQuery query, CancellationToken cancellationToken)
    {
        var user = await userRepository.FindByNameAsync(query.Name, cancellationToken)
            ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound);

        return new UserDto(
            user.Name,
            user.Email,
            user.Age,
            user.Role
            );
    }
}