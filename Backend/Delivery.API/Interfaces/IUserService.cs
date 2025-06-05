using Delivery.API.DTO;
using System.Security.Claims;

namespace Delivery.API.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> Get(ClaimsPrincipal userClaims);
        Task<UserDto?> Update(UserDto user, ClaimsPrincipal userClaims);
        Task<bool> Delete(int id, ClaimsPrincipal userClaims);
    }
}
