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

        // Servicio para Obtener lista de comidas
        public async Task<IEnumerable<FoodDto>> GetAll()
        {
            return await _context.Foods
                .Include(f => f.FoodIngredients)
                    .ThenInclude(fi => fi.Ingredient)
                .Select(f => new FoodDto
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
                        })
                        .ToList()
                })
                .ToListAsync();
        }

        // Servicio para obtener lista de comida por categoria
        public async Task<IEnumerable<FoodDto>> GetByCategory(int categoryId)
        {
            return await _context.Foods
                .Where(f => f.CategoryId == categoryId)
                .Include(f => f.FoodIngredients)
                    .ThenInclude(fi => fi.Ingredient)
                .Select(f => new FoodDto
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
                        })
                        .ToList()
                })
                .ToListAsync();
        }

        // Servicio para obtener informacion de una comida
        public async Task<FoodDto?> Get(int foodId)
        {
            return await _context.Foods
                .Where(f => f.Id == foodId)
                .Include(f => f.FoodIngredients)
                    .ThenInclude(fi => fi.Ingredient)
                .Select(f => new FoodDto
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
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();
        }

    }
}
