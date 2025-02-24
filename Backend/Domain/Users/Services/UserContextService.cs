using System.Security.Claims;
using Core.Exceptions;
using Domain.Users.Enums;
using Microsoft.AspNetCore.Http;

namespace Domain.Users.Services;

public class UserContextService(
    IHttpContextAccessor accessor
) : IUserContextService
{
    public int? GetUserId()
    {
        var user = accessor.HttpContext.User;
        return int.Parse(user.FindFirst(c
                             => c.Type == ClaimTypes.NameIdentifier)?.Value
                         ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound));
    }
}