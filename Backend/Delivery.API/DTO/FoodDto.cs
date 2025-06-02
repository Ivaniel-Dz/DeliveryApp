namespace Delivery.API.DTO
{
    public class FoodDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? Rating { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public int? Calories { get; set; }
        public string? PreparationTime { get; set; }

        // Lista de ingredientes como nombres
        public List<IngredientDto> Ingredients { get; set; } = new();
    }
}
