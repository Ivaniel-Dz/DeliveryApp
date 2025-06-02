using Delivery.API.DTO;

namespace Delivery.API.Interfaces
{
    public interface IFoodService
    {
        Task<IEnumerable<FoodDto>> GetFood(int[]? ids = null, int? categoryId = null);
    }
}
