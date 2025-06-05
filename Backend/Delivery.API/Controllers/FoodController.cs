using Delivery.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;

        public FoodController(IFoodService foodService)
        {
            _foodService = foodService;
        }

        // Metodo para Mostrar toda la lista de Comidas
        [HttpGet] // Ruta: api/food/
        public async Task<IActionResult> GetAll()
        {
            var foods = await _foodService.GetFood();
            return Ok(foods);
        }

        // Metodo para Mostrar una comida
        [HttpGet("{id}")] // Ruta: api/food/id
        public async Task<IActionResult> GetById(int id)
        {
            var food = (await _foodService.GetFood(new[] { id })).FirstOrDefault();

            if (food == null) return NotFound();

            return Ok(food);
        }

    }
}
