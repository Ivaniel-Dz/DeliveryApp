namespace Delivery.API.Models
{
    public class Food
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal? Rating { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public int? Calories { get; set; }
        public string? PreparationTime { get; set; }

        // Relaciones
        public ICollection<FoodIngredient> FoodIngredients { get; set; } = new List<FoodIngredient>();
    }

}
