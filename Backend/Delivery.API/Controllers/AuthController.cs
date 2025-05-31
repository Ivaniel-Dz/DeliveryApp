using Delivery.API.DTO;
using Delivery.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.API.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]  // Permitir acceso a este controlador sin autenticación
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Inyección del servicio
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        // Endpoint para registrar un nuevo usuario
        [HttpPost]
        [Route("Register")] // Ruta: api/Auth/Register
        public async Task<IActionResult> Register([FromBody] RegisterDto register)
        {
            var result = await _authService.Register(register);
            return Ok(result);
        }


        // Endpoint para iniciar sessión
        [HttpPost]
        [Route("Login")] // Ruta: api/Auth/Login
        public async Task<IActionResult> Login(LoginDto login)
        {
            var result = await _authService.Login(login);
            return Ok(result);
        }


        [HttpPost]
        [Route("LoginWithGoogle")] // Ruta: api/Auth/LoginWithGoogle
        public async Task<IActionResult> LoginWithGoogle([FromBody] GoogleLoginDto googleLogin)
        {
            var result = await _authService.LoginWithGoogle(googleLogin);
            return Ok(result);
        }


        // Endpoint para probar la validación
        [HttpGet]
        [Route("validarToken")] // Ruta: api/Auth/validarToken
        [Authorize]
        public IActionResult ValidarToken([FromQuery] string token)
        {
            var result = _authService.ValidarToken(token);
            return Ok(new { isSuccess = result });
        }


    }
}
