using Delivery.API.DTO;

namespace Delivery.API.Interfaces
{
    public interface IFoodService
    {
        Task<IEnumerable<FoodDto>> GetAll();
        Task<IEnumerable<FoodDto>> GetByCategory(int categoryId);
        Task<FoodDto?> Get(int foodId);
    }
}
