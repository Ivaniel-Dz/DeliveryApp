using Delivery.API.Data;
using Delivery.API.DTO;
using Delivery.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Delivery.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        // Lista de Categorias
        public async Task<IEnumerable<CategoryDto>> GetList()
        {
            // Retorna la lista de Datos
            return await _context.Categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Image = c.Image,
            }).ToListAsync();
        }

    }
}
