namespace Delivery.API.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Relaciones
        public ICollection<FoodIngredient> FoodIngredients { get; set; } = new List<FoodIngredient>();
    }

}
