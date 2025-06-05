using Delivery.API.Data;
using Delivery.API.DTO;
using Delivery.API.Interfaces;
using Delivery.API.Services.Jwt;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Delivery.API.Services
{
    public class UserService : IUserService
    {
        // Inyección de dependecias
        private readonly AppDbContext _context;
        private readonly PasswordHashService _passwordService;

        public UserService(AppDbContext context, PasswordHashService passwordService)
        {
            _context = context;
            _passwordService = passwordService;
        }

        // Servicio para mostrar los datos del Usuario
        public async Task<UserDto?> Get(ClaimsPrincipal userClaims)
        {
            // Obtengo el id del Usuario Auth
            var userId = GetUserIdFromClaims(userClaims);
            if (userId == null) return null;

            var user = await _context.Users.
                Where(u => u.Id == userId)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    Phone = u.Phone,
                    Address = u.Address,
                    Picture = u.Picture,

                }).FirstOrDefaultAsync();

            return user;
        }

        // Servicio para Actualizar información del usuario
        public async Task<UserDto?> Update(UserDto user, ClaimsPrincipal userClaims)
        {
            // Obtengo el id del Usuario Auth
            var userId = GetUserIdFromClaims(userClaims);
            if (userId == null || userId != user.Id) return null;

            var userUpdate = await _context.Users.FindAsync(userId);
            if (userUpdate == null) return null;

            // Verificar si el correo ya está en uso por otro usuario
            if (await _context.Users.AnyAsync(u => u.Email == user.Email && u.Id != user.Id))
            {
                throw new Exception("El correo ya está en uso por otro usuario.");
            }

            // Actualizar los datos si no están vacíos
            userUpdate.Name = string.IsNullOrWhiteSpace(user.Name) ? userUpdate.Name : user.Name;
            userUpdate.Email = string.IsNullOrWhiteSpace(user.Email) ? userUpdate.Email : user.Email;

            // Actualizar contraseña SOLO si se proporcionó una nueva
            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                userUpdate.Password = _passwordService.Encode(user.Password);
            }

            userUpdate.Phone = string.IsNullOrWhiteSpace(user.Phone) ? userUpdate.Phone : user.Phone;
            userUpdate.Address = string.IsNullOrWhiteSpace(user.Address) ? userUpdate.Address : user.Address;
            userUpdate.Picture = string.IsNullOrWhiteSpace(user.Picture) ? userUpdate.Picture : user.Picture;

            // Guardar los cambios en la base de datos
            _context.Users.Update(userUpdate);
            await _context.SaveChangesAsync();

            // Retorna algunos datos actualizados
            return new UserDto { Id = userUpdate.Id, Name = userUpdate.Name, Email = userUpdate.Email };
        }

        // Servicio para eliminar cuenta del usuario
        public async Task<bool> Delete(int id, ClaimsPrincipal userClaims) {
            // Obtengo el id del Usuario Auth
            var userId = GetUserIdFromClaims(userClaims);
            // Compara el id del auth con el id del usuario
            if (userId == null || userId != id) return false;

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id  == id);
            if (user == null) return false;
            
            // Remover el usuario
            _context.Users.Remove(user);
            // Guardar los cambios
            await _context.SaveChangesAsync();

            return true;
        }

        // Metodo para verficar la autenticación del usuario
        private int? GetUserIdFromClaims(ClaimsPrincipal claims)
        {
            // Verfica si esta autenticado
            if (claims?.Identity?.IsAuthenticated != true)
                return null;

            var claim = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : null;
        }

    }
}
