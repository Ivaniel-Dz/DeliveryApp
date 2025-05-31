using Delivery.API.Data;
using Delivery.API.Services.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Swagger: Tool to generate API automatic documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configuración de la base de datos (MySQL)
var connectionString = builder.Configuration.GetConnectionString("CadenaSQL");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);


// Registrar servicios personalizados
builder.Services.AddScoped<PasswordHashService>();
builder.Services.AddScoped<JwtGenerator>();
builder.Services.AddScoped<JwtValidator>();


// Configuración de la autenticación con JWT
builder.Services.AddAuthentication(config =>
{
    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // Esquema predeterminado de autenticación
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; // Esquema predeterminado para desafíos de autenticación
}).AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false; // No requiere HTTPS (útil en desarrollo)
    config.SaveToken = true; // Permitir que el servidor guarde el token
    config.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true, // Validar la clave de firma del emisor
        ValidateIssuer = false, // No validar el emisor (puedes cambiarlo según sea necesario)
        ValidateAudience = false, // No validar la audiencia (puedes cambiarlo según sea necesario)
        ValidateLifetime = true, // Validar que el token no esté expirado
        ClockSkew = TimeSpan.Zero, // No permitir margen de tiempo adicional para expiración
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]!)) // Clave de firma del token
    };
});


// Crea la aplicación
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
