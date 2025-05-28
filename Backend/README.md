Paquetes del Proyecto
ASP.NET Core:

Entity Framework Core (8.0.16): ORM utilizado para interactuar con la base de datos de forma eficiente y sin necesidad de escribir consultas SQL manualmente.

Microsoft Entity Framework Core Tools (8.0.16): Proporciona herramientas como migraciones para la gestión de la base de datos desde la línea de comandos.

Microsoft AspNetCore Authentication JwtBearer (8.0.16): Habilita la autenticación basada en JWT en aplicaciones ASP.NET Core.

Pomelo Entity Framework Core MySql ((8.1.2): Es el proveedor Entity Framework Core para trabajar con bases de datos MySQL o MariaDB.

Microsoft.AspNetCore.Authentication.Google (8.0.16): Este paquete permite autenticación externa usando cuentas de Google (OAuth 2.0).

## Tablas de las relacion de las entidades o Modelos

### 📊 Tabla de Relaciones entre Modelos (Delivery App)

| Modelo/Tabla A     | Relación         | Modelo/Tabla B   | Tipo de Relación                | Descripción                                                                |
| ------------------ | ---------------- | ---------------- | ------------------------------- | -------------------------------------------------------------------------- |
| **Category**       | 1 → ∞            | **Food**         | Uno a muchos                    | Una categoría tiene muchas comidas. Cada comida pertenece a una categoría. |
| **Food**           | ∞ → ∞            | **Ingredient**   | Muchos a muchos                 | Una comida puede tener muchos ingredientes y viceversa.                    |
| **FoodIngredient** | Tabla intermedia |                  |                                 | Define la relación muchos a muchos entre Food e Ingredient.                |
| **User**           | 1 → ∞            | **Order**        | Uno a muchos                    | Un usuario puede hacer muchos pedidos.                                     |
| **Order**          | 1 → ∞            | **OrderHistory** | Uno a muchos                    | Un pedido puede tener múltiples eventos o cambios de estado.               |

---
