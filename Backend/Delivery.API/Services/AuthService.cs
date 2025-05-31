using Delivery.API.Data;
using Delivery.API.DTO;
using Delivery.API.Interfaces;
using Delivery.API.Models;
using Delivery.API.Services.Jwt;
using Microsoft.EntityFrameworkCore;
using Google.Apis.Auth;

namespace Delivery.API.Services
{
    public class AuthService : IAuthService
    {
        // Inyencion de dependencias
        private readonly AppDbContext _context;
        private readonly PasswordHashService _passwordService;
        private readonly JwtGenerator _jwtGenerator;
        private readonly JwtValidator _jwtValidator;

        public AuthService(AppDbContext context, PasswordHashService passwordService, JwtGenerator jwtGenerator, JwtValidator jwtValidator)
        {
            _context = context;
            _passwordService = passwordService;
            _jwtGenerator = jwtGenerator;
            _jwtValidator = jwtValidator;
        }

        // Servicio para Registrar nuevo usuario
        public async Task<ResponseDto> Register(RegisterDto register)
        {
            // Verificar si el correo ya esta registrado
            var existsEmail = await _context.Users.AnyAsync(u => u.Email == register.Email);
            if (existsEmail)
            {
                return new ResponseDto { IsSuccess = false, Message = "Ya existe un usuario con este correo." };
            }

            // Crear un nuevo usuario
            var user = new User
            {
                Name = register.Name,
                Email = register.Email,
                Phone = register.Phone,
                Password = _passwordService.Encode(register.Password),
            };

            // Agregar nuevo usario a la BD
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Usuario Registrado." };
        }

        // Servicio para Iniciar Sessión
        public async Task<ResponseDto> Login(LoginDto login)
        {
            // Busca al usuario por correo
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email);

            // Verifica si la contraseña es correcta
            if (user == null || string.IsNullOrEmpty(user.Password) || _passwordService.Verify(login.Password, user.Password))
            {
                return new ResponseDto { IsSuccess = false, Message = "Credenciales Incorrectos", Token = "" };
            }

            // Genera el token
            var token = _jwtGenerator.TokenGenerator(user);

            return new ResponseDto { IsSuccess = true, Token = token };
        }

        public async Task<ResponseDto> LoginWithGoogle(GoogleLoginDto googleLogin)
        {
            try
            {
                // Verificar el id_token usando Google SDK
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleLogin.IdToken);

                // Buscar usuario en la base de datos por correo
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        Name = payload.Name,
                        Email = payload.Email,
                        Password = null, // Opcional si solo inicia sesión con Google
                        Phone = "",
                    };

                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();
                }

                // Generar JWT
                var token = _jwtGenerator.TokenGenerator(user);

                return new ResponseDto { IsSuccess = true, Token = token };
            }
            catch (InvalidJwtException ex)
            {
                return new ResponseDto { IsSuccess = false, Message = "Token de Google inválido: " + ex.Message };
            }
            catch (Exception ex)
            {
                return new ResponseDto { IsSuccess = false, Message = "Error al validar el token: " + ex.Message };
            }
        }

        // Servicio para validar token
        public bool ValidarToken(string token)
        {
            return _jwtValidator.TokenValidator(token);
        }

    }
}
