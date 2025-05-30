using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Delivery.API.Services.Jwt
{
    public class JwtValidator
    {
        /** 
         * IConfiguration: Permite acceder a la configuración de tu aplicación, 
         * como valores del appsettings.json
        **/
        private readonly IConfiguration _configuration;
        public JwtValidator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Método para valaidar el token
        public bool TokenValidator(string token)
        {
            var claimsPrincipal = new ClaimsPrincipal();
            var tokenHandler = new JwtSecurityTokenHandler();

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true, // Validar la clave de firma del emisor
                ValidateIssuer = false, // No validar el emisor (puedes cambiarlo según sea necesario)
                ValidateAudience = false, // No validar la audiencia (puedes cambiarlo según sea necesario)
                ValidateLifetime = true, // Validar que el token no esté expirado
                ClockSkew = TimeSpan.Zero, // No permitir margen de tiempo adicional para expiración
                IssuerSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!)) // Clave de firma del token
            };

            try
            {
                claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch (SecurityTokenExpiredException)
            {
                return false;
            }
            catch (SecurityTokenInvalidSignatureException)
            {
                return false;
            }
            catch (Exception)
            {
                return false;
            }

        } // Fin de TokenValidator
    } // Fin de la clase
} // Fin del namespace
