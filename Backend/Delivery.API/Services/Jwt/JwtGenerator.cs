using Delivery.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Delivery.API.Services.Jwt
{
    public class JwtGenerator
    {
        /** 
        * IConfiguration: Permite acceder a la configuración de tu aplicación, 
        * como valores del appsettings.json
        **/
        private readonly IConfiguration _configuration;

        public JwtGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Método para generar un token JWT
        public string TokenGenerator(User user)
        {
            // Crear los claims (información del usuario) que irán dentro del token
            var userClaims = new[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!)
            };

            // Obtener la clave de firma simétrica desde la configuración
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
            // Crear credenciales de firma utilizando la clave y el algoritmo HMAC SHA256
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            // Detalles del token (claims, tiempo de expiración y firma)
            var jwtConfig = new JwtSecurityToken(
                    claims: userClaims, // Claims del token
                    expires: DateTime.UtcNow.AddMinutes(30), // Expira en 30 minutos
                    signingCredentials: credential // Credenciales de firma
                );

            // Crear y devolver el token JWT como cadena
            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }

    }
}
