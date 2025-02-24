using System.Security.Cryptography;
using System.Text;
using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Authentication.Dto;
using Domain.Authentication.Enums;
using Domain.Users.Entities;
using Domain.Users.Enums;
using Domain.Users.Repositories;
using MediatR;

namespace Domain.Authentication.Commands;

public record RegisterCommand(RegisterParams Input) : ICommand<int>;

internal class RegisterCommandHandler(
    IUserRepository userRepository,
    IUnitOfWork unitOfWork
    ) : IRequestHandler<RegisterCommand, int>
{
    public async Task<int> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var input = command.Input;
        var nameExists = await userRepository.AnyAsync(x => x.Name == input.Name, cancellationToken);
        
        if(nameExists)
            throw new DomainException("Provided name is unavailable", (int)UserErrorCode.NameExists);
        if(input.Password != input.ConfirmPassword)
            throw new DomainException("Passwords do not match.", (int)AuthErrorCode.InvalidPassword);

        using var hmac = new HMACSHA512();
        var user = new User(
            input.Name,
            input.Email,
            input.Age,
            null,
            hmac.ComputeHash(Encoding.UTF8.GetBytes(input.Password)),
            hmac.Key,
            UserRole.Admin
        );

        userRepository.Add(user);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return user.Id;
    }
}