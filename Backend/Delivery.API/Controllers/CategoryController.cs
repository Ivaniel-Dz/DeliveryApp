using Delivery.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IFoodService _foodService;

        public CategoryController(ICategoryService categoryService, IFoodService foodService)
        {
            _categoryService = categoryService;
            _foodService = foodService;
        }

        // Método para obtener toda la lista de Categorias
        [HttpGet] // Ruta: api/category
        public async Task<IActionResult> GetList()
        {
            var categories = await _categoryService.GetList();
            return Ok(categories);
        }

        // Método para ingresar a lista de comida por categoria
        [HttpGet("{categoryId}")] // Ruta: api/category/categoryId
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var foods = await _foodService.GetFood(null, categoryId);
            return Ok(foods);
        }

    }
}
