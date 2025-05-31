using Delivery.API.DTO;

namespace Delivery.API.Interfaces
{
    public interface IAuthService
    {
        Task<ResponseDto> Register(RegisterDto register);
        Task<ResponseDto> Login(LoginDto login);
        Task<ResponseDto> LoginWithGoogle(GoogleLoginDto googleLogin);
        bool ValidarToken(string token);
    }
}
