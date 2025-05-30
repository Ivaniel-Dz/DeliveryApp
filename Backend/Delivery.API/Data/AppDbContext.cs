using Delivery.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Delivery.API.Data
{
    public class AppDbContext : DbContext
    {
        // Constructor por defecto
        public AppDbContext() { }

        // Constructor que recibe opciones de configuración para el contexto de la base de datos.
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Definir las tablas del contexto
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<FoodIngredient> FoodIngredients { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }

        // Método para configurar la base de datos (se deja vacío para evitar sobreescritura)
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        // Define los columnas de las tablas
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tabla Users
            modelBuilder.Entity<User>(tb =>
            {
                tb.ToTable("Users");
                tb.HasKey(u => u.Id);
                tb.Property(u => u.Id).UseMySqlIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(u => u.Name).HasMaxLength(50);
                tb.Property(u => u.Email).HasMaxLength(50);
                tb.Property(u => u.Password).HasMaxLength(150);
                tb.Property(u => u.Phone).HasMaxLength(50);
                tb.Property(u => u.Address).HasMaxLength(50);
                tb.Property(u => u.Picture).HasMaxLength(50);
            });

            // Tabla Categories
            modelBuilder.Entity<Category>(tb =>
            {
                tb.ToTable("Categories");
                tb.HasKey(c => c.Id);
                tb.Property(c => c.Id).UseMySqlIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(c => c.Name).HasMaxLength(50);
                tb.Property(c => c.Image).HasMaxLength(255);

            });

            // Tabla Foods
            modelBuilder.Entity<Food>(tb =>
            {
                tb.ToTable("Foods");
                tb.HasKey(f => f.Id);
                tb.Property(f => f.Id).UseMySqlIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(f => f.Name).HasMaxLength(100);
                tb.Property(f => f.Price).HasColumnType("decimal(6,2)");
                tb.Property(f => f.Rating).HasColumnType("decimal(2,1)");
                tb.Property(f => f.Image).HasMaxLength(255);
                tb.Property(f => f.Description).HasMaxLength(255);
                tb.Property(f => f.Calories).HasColumnType("int");
                tb.Property(f => f.PreparationTime).HasMaxLength(20);

                // Relacion Foods con Categories
                tb.HasOne(f => f.Category)
                      .WithMany(c => c.Foods)
                      .HasForeignKey(f => f.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Tabla Ingredients
            modelBuilder.Entity<Ingredient>(tb =>
            {
                tb.ToTable("Ingredients");
                tb.HasKey(i => i.Id);
                tb.Property(i => i.Id).UseMySqlIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(i => i.Name).HasMaxLength(100);
                tb.HasIndex(i => i.Name).IsUnique();
            });

            // Tabla intermedia FoodIngredients
            modelBuilder.Entity<FoodIngredient>(tb =>
            {
                tb.ToTable("FoodIngredients");

                tb.HasKey(fi => new { fi.FoodId, fi.IngredientId });

                tb.HasOne(fi => fi.Food)
                      .WithMany(f => f.FoodIngredients)
                      .HasForeignKey(fi => fi.FoodId)
                      .OnDelete(DeleteBehavior.Cascade);

                tb.HasOne(fi => fi.Ingredient)
                      .WithMany(i => i.FoodIngredients)
                      .HasForeignKey(fi => fi.IngredientId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

        } // Fin de Generador de modelos

    } // Fin de la clase
}// Fin
