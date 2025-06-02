using Delivery.API.DTO;

namespace Delivery.API.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetList();
    }
}
