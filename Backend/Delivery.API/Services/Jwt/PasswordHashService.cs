using System.Security.Cryptography;
using System.Text;

namespace Delivery.API.Services.Jwt
{
    public class PasswordHashService
    {

        // Método para encriptar una cadena de texto utilizando SHA256
        public string Encode(string password)
        {
            // Crear una instancia de SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Computar el hash a partir del texto
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                // Convertir el resultado a formato hexadecima
                for (int i = 0; i < bytes.Length; i++)
                {
                    // Formatear el valor como hexadecimal
                    builder.Append(bytes[i].ToString("x2"));
                }
                // Devolver la cadena encriptada
                return builder.ToString();
            }
        }

        // Método para verificar que una contraseña coincida con su hash
        public bool Verify(string password, string passwordHash)
        {
            var codedPassword = Encode(password);
            return codedPassword == passwordHash;
        }

    }
}
