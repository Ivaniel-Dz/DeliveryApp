namespace Delivery.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }

        // Relaciones
        public ICollection<Food> Foods { get; set; } = new List<Food>();
    }

}
