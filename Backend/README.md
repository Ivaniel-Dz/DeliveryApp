
# 🔧 **Delivery.API - Backend ASP.NET Core**

## 📦 **Paquetes del Proyecto**

| Paquete                                         | Versión | Descripción                                                          |
| ----------------------------------------------- | ------- | -------------------------------------------------------------------- |
| `Entity Framework Core`                         | 8.0.16  | ORM para interactuar con la base de datos de forma eficiente.        |
| `Microsoft.EntityFrameworkCore.Tools`           | 8.0.16  | Herramientas de migraciones desde CLI.                               |
| `Microsoft.AspNetCore.Authentication.JwtBearer` | 8.0.16  | Autenticación basada en JWT.                                         |
| `Pomelo.EntityFrameworkCore.MySql`              | 8.1.2   | Proveedor EF Core para MySQL/MariaDB.                                |
| `Google.Apis.Auth`                              | Última  | Para validar el `id_token` recibido desde el frontend.               |
| `Microsoft.AspNetCore.Authentication.Google`    | 8.0.16  | 🔒 *Solo para apps Razor/MVC que usan OAuth completo vía navegador.* |

---

## 🧱 **Relaciones entre Entidades / Modelos**

### 📊 Diagrama de Relaciones

| 🟦 Modelo A      | 🔁 Relación  | 🟨 Modelo B    | 🔗 Tipo de Relación | 📄 Descripción                                  |
| ---------------- | ------------ | -------------- | ------------------- | ----------------------------------------------- |
| `Category`       | 1 → ∞        | `Food`         | Uno a muchos        | Una categoría tiene muchas comidas.             |
| `Food`           | ∞ → ∞        | `Ingredient`   | Muchos a muchos     | Comidas con múltiples ingredientes.             |
| `FoodIngredient` | (Intermedia) |                | Tabla intermedia    | Define la relación entre `Food` e `Ingredient`. |
| `User`           | 1 → ∞        | `Order`        | Uno a muchos        | Un usuario puede tener muchos pedidos.          |
| `Order`          | 1 → ∞        | `OrderHistory` | Uno a muchos        | Historial de cambios en el pedido.              |

---

## 🔐 **Configuración de OAuth con Google**

### ✅ **Tipo de Aplicación a usar en Google Cloud Console:**

> **Aplicación web**

---

## ⚙️ **Configuraciones necesarias en Google Cloud Console**

### 🔹 **Orígenes JavaScript autorizados:**

Define desde dónde puede iniciar sesión el usuario (frontend):

```
http://localhost:8100
```

> ⚠️ *No pongas aquí el backend (`https://localhost:44308`)*

---

### 🔹 **URIs de redireccionamiento autorizados:**

Define adónde redirige Google tras un login exitoso:

```
https://localhost:44308/signin-google
```

> ✳️ Este es el endpoint por defecto si usas `.AddGoogle()` en MVC/Razor apps.

---

### 📋 **Ejemplo de Configuración en Google Cloud Console**

| Campo                   | Valor                                   |
| ----------------------- | --------------------------------------- |
| **Tipo de aplicación**  | Aplicación Web                          |
| **Orígenes JavaScript** | `http://localhost:8100`                 |
| **URIs de redirección** | `https://localhost:44308/signin-google` |

---

## 🔁 **Flujo de Autenticación en la App**

1. 🔐 El frontend (Ionic) inicia sesión con Google (desde móvil o web).
2. ✅ Google entrega un `id_token` al frontend.
3. 📡 El frontend envía el `id_token` al backend (`/api/Auth/LoginWithGoogle`).
4. 🔍 El backend valida el `id_token` usando `GoogleJsonWebSignature`.
5. 🧾 Si es válido, genera un **JWT propio**.
6. 📦 El JWT se envía al frontend, que lo guarda (ej. en localStorage o Capacitor Preferences).
7. 🔐 Las siguientes peticiones usan este JWT como `Bearer Token`.

---

## 🚫 **¿Necesito configurar `.AddGoogle()` en `Program.cs`?**

**No.**
Este flujo no requiere que el backend redireccione al usuario a Google, porque:

* El login se hace en el **frontend**.
* El backend **solo valida el `id_token`** que ya viene listo desde el cliente.

---

## ✅ **Configuración recomendada en `Program.cs` para JWT**

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
```

---

## 💡 **Resumen Rápido**

| Escenario                                                           | ¿Usar `.AddGoogle()`? |
| ------------------------------------------------------------------- | --------------------- |
| App móvil o híbrida con login en frontend (Capacitor/Firebase/etc.) | ❌ No                  |
| Web tradicional (Razor/MVC) con redirección a Google                | ✅ Sí                  |

---