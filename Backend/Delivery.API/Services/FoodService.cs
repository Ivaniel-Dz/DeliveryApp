using Delivery.API.Data;
using Delivery.API.DTO;
using Delivery.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Delivery.API.Services
{
    public class FoodService : IFoodService
    {
        private readonly AppDbContext _context;
        public FoodService(AppDbContext context)
        {
            _context = context;
        }

        // Servicio para Obtener Comidas
        public async Task<IEnumerable<FoodDto>> GetFood(int[]? ids = null, int? categoryId = null)
        {
            var query = _context.Foods
                .Include(f => f.FoodIngredients)
                    .ThenInclude(fi => fi.Ingredient)
                .AsQueryable();

            if (ids != null && ids.Any())
                query = query.Where(f => ids.Contains(f.Id));

            if (categoryId.HasValue)
                query = query.Where(f => f.CategoryId == categoryId.Value);

            return await query.Select(f => new FoodDto
            {
                Id = f.Id,
                CategoryId = f.CategoryId,
                Name = f.Name,
                Price = f.Price,
                Rating = f.Rating,
                Image = f.Image,
                Description = f.Description,
                Calories = f.Calories,
                PreparationTime = f.PreparationTime,
                Ingredients = f.FoodIngredients
                    .Select(fi => new IngredientDto
                    {
                        Id = fi.Ingredient.Id,
                        Name = fi.Ingredient.Name
                    }).ToList()
            }).ToListAsync();
        }

    }
}
