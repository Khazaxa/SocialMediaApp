using Core.Cqrs;
using Core.Exceptions;
using Domain.Users.Dto;
using Domain.Users.Enums;
using Domain.Users.Repositories;

namespace Domain.Users.Queries;

public record UserGetByIdQuery(int Id) : IQuery<UserDto>;

internal class UserGetIdQueryHandler(
    IUserRepository userRepository
) : IQueryHandler<UserGetByIdQuery, UserDto>
{
    public async Task<UserDto> Handle(UserGetByIdQuery query, CancellationToken cancellationToken)
    {
        var user = await userRepository.FindAsync(query.Id, cancellationToken)
                   ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound);

        return new UserDto(
            user.Id,
            user.Name,
            user.Email,
            user.Age,
            user.Role,
            user.AvatarImageId
        );
    }
}