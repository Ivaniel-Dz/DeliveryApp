# Delivery.API

## Paquetes del Proyecto ASP.NET Core:

- **Entity Framework Core** (8.0.16): ORM utilizado para interactuar con la base de datos de forma eficiente y sin necesidad de escribir consultas SQL manualmente.

- **Microsoft Entity Framework Core Tools** (8.0.16): Proporciona herramientas como migraciones para la gestión de la base de datos desde la línea de comandos.

- **Microsoft AspNetCore Authentication JwtBearer** (8.0.16): Habilita la autenticación basada en JWT en aplicaciones ASP.NET Core.

- **Pomelo Entity Framework Core MySql** ((8.1.2): Es el proveedor Entity Framework Core para trabajar con bases de datos MySQL o MariaDB.

- **Google.Apis.Auth:** Validar id_token que viene del frontend móvil/web.

- **Microsoft.AspNetCore.Authentication.Google** (8.0.16) [eso es solo para aplicaciones Razor/MVC]: Este paquete permite autenticación externa usando cuentas de Google (OAuth 2.0).

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


## Confguracion de OAuth Google

### ✅ Debes usar como **tipo de aplicación**:

**Aplicación web**

---

## 🎯 ¿Qué debes configurar en Google Cloud?

### 🔹 **Orígenes JavaScript autorizados (Authorized JavaScript origins):**

Estos indican **desde qué frontend se permite hacer solicitudes al backend**:

```
http://localhost:8100
```

*(Tu app Ionic ejecutándose en desarrollo)*

> ⚠️ No pongas aquí tu backend (`https://localhost:44308`), solo el frontend.

---

### 🔹 **URIs de redireccionamiento autorizados (Authorized redirect URIs):**

Estos indican **a dónde Google redirige después del login exitoso**.
**Como estás manejando el login en el backend**, aquí debes poner la URL del endpoint que recibe el token de Google en ASP.NET Core:

```
https://localhost:44308/signin-google
```

> Este es el **default redirect URI** usado por ASP.NET Core cuando configuras `AddAuthentication().AddGoogle()`.

---

## ✅ Ejemplo de configuración correcta en Google Cloud Console:

| Campo                   | Valor                                   |
| ----------------------- | --------------------------------------- |
| **Tipo de aplicación**  | Aplicación Web                          |
| **Orígenes JavaScript** | `http://localhost:8100`                 |
| **URIs de redirección** | `https://localhost:44308/signin-google` |

---

## 🚀 Flujo de autenticación

1. El frontend (Ionic) redirige o inicia el flujo de login (opcional).
2. El backend (ASP.NET Core) maneja el login con Google.
3. Google redirige a `https://localhost:44308/signin-google`.
4. ASP.NET Core recibe el callback, valida el usuario y genera el JWT.
5. El backend devuelve ese JWT al frontend (como respuesta JSON).
6. El frontend guarda el JWT (por ejemplo, en `localStorage`) para futuras peticiones autenticadas.

---

### ✅ ¿Por qué no se configura OAuth en `Program.cs`?

Porque **no se esta redirecionando o login vía navegador desde el backend** (como ocurre en aplicaciones web tradicionales MVC), sino que:

* El frontend (app móvil/híbrida) hace el login con Google usando SDKs como Capacitor, Firebase o Google JS.
* El `id_token` resultante se manda al backend.
* El backend **solo lo valida** y responde con un JWT personalizado.

---

### 🛠️ Solo necesitas esto en `Program.cs` para validar tus propios JWT:

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

### 🧠 ¿Cuándo usar `.AddGoogle()` en `Program.cs`?

Solo en escenarios como:

* Aplicaciones web Razor/MVC.
* Donde la autenticación ocurre redirigiendo al usuario a Google (OAuth completo).
* El backend recibe el `code` de autorización, no el `id_token`.

**No necesitas `.AddGoogle()` en `Program.cs` si tu app móvil obtiene el `id_token` desde el frontend.** Basta con:

1. Validar ese `id_token` en el backend con `GoogleJsonWebSignature`.
2. Generar y retornar tu JWT personalizado.

