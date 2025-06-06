using Delivery.API.DTO;
using Delivery.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Método para obtener datos del usuario
        [HttpGet] // api/user
        public async Task<IActionResult> Get()
        {
            var user = await _userService.Get(User);

            if (user == null)
            {
                return NotFound(new ResponseDto { IsSuccess = false, Message = "Usuario no encontrado." });
            }

            return Ok(new { IsSuccess = true, Response = user });
        }


        // Metodo para actualizar usuario
        [HttpPut("update")] // api/user/update
        public async Task<IActionResult> Update([FromBody] UserDto user)
        {
            try
            {
                var updated = await _userService.Update(user, User);
                if (updated == null)
                    return BadRequest(new ResponseDto { IsSuccess = false, Message = "No se pudo actualizar el usuario." });

                return Ok(new { IsSuccess = true, Response = updated });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseDto { IsSuccess = false, Message = ex.Message });
            }
        }


        // Método para actualizar contraseña
        [HttpPost("change-password")] // api/user/change-password
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            try
            {
                var updated = await _userService.ChangePassword(dto, User);
                if (!updated)
                    return BadRequest(new ResponseDto { IsSuccess = false, Message = "No se pudo cambiar la contraseña." });

                return Ok(new ResponseDto { IsSuccess = true, Message = "Contraseña actualizada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseDto { IsSuccess = false, Message = ex.Message });
            }
        }


        // Método para Eliminar cuenta de usuario
        [HttpDelete("delete/{id}")] // api/user/delete/id
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _userService.Delete(id, User);

            if (!deleted)
            {
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Usuario no encontrado o no tienes permisos para eliminarlo"
                });
            }

            return Ok(new ResponseDto
            {
                IsSuccess = true,
                Message = "La cuenta ha sido eliminada exitosamente."
            });
        }

    }
}
