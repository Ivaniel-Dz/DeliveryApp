-- Tabla de categorías
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255)
);

-- Insertar categorías
INSERT INTO categories (id, name, image) VALUES
(1, 'Hamburguesas', 'https://images.unsplash.com/photo-1550547660-d9450f859349'),
(2, 'Pizzas', 'https://images.unsplash.com/photo-1548365328-8b13f6201c8b'),
(3, 'Tacos', 'https://images.unsplash.com/photo-1601924638867-3ec1cf34e3a2'),
(4, 'Ensaladas', 'https://images.unsplash.com/photo-1551024601-bec78aea704b'),
(5, 'Postres', 'https://images.unsplash.com/photo-1608219959330-eedcbf60c0a2'),
(6, 'Bebidas', 'https://images.unsplash.com/photo-1571079143720-1337b0bd46a5');

-- Tabla de alimentos
CREATE TABLE foods (
    id INT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    rating DECIMAL(2,1),
    image VARCHAR(255),
    description TEXT,
    calories INT,
    preparation_time VARCHAR(20),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insertar alimentos
INSERT INTO foods (id, category_id, name, price, rating, image, description, calories, preparation_time) VALUES
(101, 1, 'Hamburguesa Clásica', 8.99, 4.5, 'https://source.unsplash.com/featured/?burger1', 'Deliciosa hamburguesa con carne de res, lechuga, tomate, cebolla, queso cheddar y nuestra salsa especial.', 650, '15-20 min'),
(102, 1, 'Hamburguesa con Queso', 9.99, 4.7, 'https://source.unsplash.com/featured/?burger2', 'Hamburguesa con doble queso cheddar derretido, carne jugosa y salsa especial.', 750, '15-20 min'),
(103, 1, 'Hamburguesa BBQ', 10.49, 4.6, 'https://source.unsplash.com/featured/?burger3', 'Hamburguesa con salsa BBQ, cebolla caramelizada y tocino crujiente.', 780, '15-20 min'),
(104, 1, 'Hamburguesa Vegana', 9.49, 4.2, 'https://source.unsplash.com/featured/?burger4', 'Hamburguesa con patty vegetal, lechuga, tomate y aguacate.', 600, '15-20 min'),
(105, 1, 'Hamburguesa Picante', 9.99, 4.4, 'https://source.unsplash.com/featured/?burger5', 'Hamburguesa con jalapeños, salsa picante y queso pepper jack.', 720, '15-20 min'),
(106, 2, 'Pizza Margarita', 10.99, 4.6, 'https://source.unsplash.com/featured/?pizza1', 'Pizza clásica con salsa de tomate, mozzarella y albahaca.', 700, '15-20 min'),
(107, 2, 'Pizza Pepperoni', 11.49, 4.7, 'https://source.unsplash.com/featured/?pizza2', 'Pizza con abundante pepperoni y queso fundido.', 800, '15-20 min'),
(108, 2, 'Pizza Hawaiana', 11.99, 4.3, 'https://source.unsplash.com/featured/?pizza3', 'Pizza con jamón y piña sobre base de queso mozzarella.', 750, '15-20 min'),
(109, 2, 'Pizza Vegetariana', 10.49, 4.5, 'https://source.unsplash.com/featured/?pizza4', 'Pizza con champiñones, pimientos, cebolla y aceitunas.', 690, '15-20 min'),
(110, 2, 'Pizza Cuatro Quesos', 12.49, 4.8, 'https://source.unsplash.com/featured/?pizza5', 'Pizza con mezcla de mozzarella, parmesano, gorgonzola y cheddar.', 830, '15-20 min'),
(111, 3, 'Taco al Pastor', 10.99, 4.3, 'https://source.unsplash.com/featured/?taco1', 'Tacos tradicionales de cerdo marinado con piña y cebolla.', 480, '15-20 min'),
(112, 3, 'Taco de Asada', 9.49, 4.6, 'https://source.unsplash.com/featured/?taco2', 'Tacos con carne asada, guacamole y salsa.', 510, '15-20 min'),
(113, 3, 'Taco de Pollo', 8.99, 4.4, 'https://source.unsplash.com/featured/?taco3', 'Tacos de pollo a la parrilla con pico de gallo.', 460, '15-20 min'),
(114, 3, 'Taco Vegano', 9.29, 4.2, 'https://source.unsplash.com/featured/?taco4', 'Taco con tofu marinado y vegetales frescos.', 430, '15-20 min'),
(115, 3, 'Taco de Camarón', 11.49, 4.7, 'https://source.unsplash.com/featured/?taco5', 'Tacos de camarón empanizado con col y aderezo.', 500, '15-20 min'),
(116, 4, 'Ensalada César', 7.99, 4.5, 'https://source.unsplash.com/featured/?salad1', 'Ensalada clásica con lechuga romana, crutones y aderezo césar.', 350, '15-20 min'),
(117, 4, 'Ensalada Griega', 8.49, 4.6, 'https://source.unsplash.com/featured/?salad2', 'Mezcla de vegetales con queso feta y aceitunas negras.', 320, '15-20 min'),
(118, 4, 'Ensalada de Pollo', 9.49, 4.4, 'https://source.unsplash.com/featured/?salad3', 'Ensalada con pechuga de pollo a la parrilla y aderezo ranch.', 400, '15-20 min'),
(119, 4, 'Ensalada Vegana', 8.99, 4.3, 'https://source.unsplash.com/featured/?salad4', 'Mix de hojas verdes con quinoa, aguacate y tomate cherry.', 390, '15-20 min'),
(120, 4, 'Ensalada de Atún', 9.29, 4.2, 'https://source.unsplash.com/featured/?salad5', 'Ensalada con atún, huevo cocido y mayonesa ligera.', 410, '15-20 min'),
(121, 5, 'Cheesecake', 5.99, 4.8, 'https://source.unsplash.com/featured/?dessert1', 'Pastel de queso suave con base de galleta.', 450, '15-20 min'),
(122, 5, 'Brownie', 4.99, 4.6, 'https://source.unsplash.com/featured/?dessert2', 'Brownie de chocolate húmedo con nueces.', 430, '15-20 min'),
(123, 5, 'Helado de Vainilla', 3.99, 4.4, 'https://source.unsplash.com/featured/?dessert3', 'Helado cremoso con sabor a vainilla natural.', 380, '15-20 min'),
(124, 5, 'Tiramisú', 6.49, 4.7, 'https://source.unsplash.com/featured/?dessert4', 'Postre italiano con café, queso mascarpone y cacao.', 470, '15-20 min'),
(125, 5, 'Fruta Fresca', 4.49, 4.2, 'https://source.unsplash.com/featured/?dessert5', 'Selección de frutas frescas de temporada.', 200, '15-20 min'),
(126, 6, 'Agua Mineral', 1.99, 4.3, 'https://source.unsplash.com/featured/?drink1', 'Agua con gas refrescante.', 0, '15-20 min'),
(127, 6, 'Jugo de Naranja', 2.99, 4.5, 'https://source.unsplash.com/featured/?drink2', 'Jugo natural de naranja recién exprimido.', 110, '15-20 min'),
(128, 6, 'Refresco', 1.99, 4.1, 'https://source.unsplash.com/featured/?drink3', 'Refresco de cola clásico.', 140, '15-20 min'),
(129, 6, 'Café Helado', 3.49, 4.6, 'https://source.unsplash.com/featured/?drink4', 'Café frío con leche y hielo.', 120, '15-20 min'),
(130, 6, 'Té Verde', 2.49, 4.4, 'https://source.unsplash.com/featured/?drink5', 'Té verde natural servido frío.', 50, '15-20 min');

-- Tabla de ingredientes
CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Insertar ingredientes únicos
INSERT INTO ingredients (name) VALUES
('Carne de res'),
('Pan'),
('Lechuga'),
('Tomate'),
('Cebolla'),
('Queso cheddar'),
('Salsa especial'),
('Doble queso cheddar'),
('Salsa BBQ'),
('Cebolla caramelizada'),
('Tocino'),
('Patty vegetal'),
('Aguacate'),
('Jalapeños'),
('Salsa picante'),
('Queso pepper jack'),
('Salsa de tomate'),
('Mozzarella'),
('Albahaca'),
('Pepperoni'),
('Jamón'),
('Piña'),
('Champiñones'),
('Pimientos'),
('Aceitunas'),
('Parmesano'),
('Gorgonzola'),
('Cheddar'),
('Cerdo'),
('Tortilla de maíz'),
('Carne asada'),
('Guacamole'),
('Salsa'),
('Pollo'),
('Pico de gallo'),
('Tofu'),
('Verduras'),
('Salsa verde'),
('Camarón'),
('Col'),
('Aderezo'),
('Lechuga romana'),
('Crutones'),
('Aderezo césar'),
('Queso feta'),
('Aceitunas'),
('Zanahoria'),
('Aderezo ranch'),
('Quinoa'),
('Espinaca'),
('Tomate cherry'),
('Atún'),
('Huevo'),
('Mayonesa'),
('Queso crema'),
('Galleta'),
('Azúcar'),
('Mermelada'),
('Chocolate'),
('Nueces'),
('Harina'),
('Mascarpone'),
('Café'),
('Bizcocho'),
('Cacao'),
('Frutas variadas'),
('Agua con gas'),
('Naranja'),
('Agua'),
('Gas'),
('Leche'),
('Hielo'),
('Té verde');

-- Tabla intermedia para la relación muchos a muchos entre foods e ingredients
CREATE TABLE food_ingredients (
    food_id INT,
    ingredient_id INT,
    PRIMARY KEY (food_id, ingredient_id),
    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Ejemplo para Hamburguesa Clásica (id=101)
INSERT INTO food_ingredients (food_id, ingredient_id) VALUES
(101, (SELECT id FROM ingredients WHERE name='Carne de res')),
(101, (SELECT id FROM ingredients WHERE name='Pan')),
(101, (SELECT id FROM ingredients WHERE name='Lechuga')),
(101, (SELECT id FROM ingredients WHERE name='Tomate')),
(101, (SELECT id FROM ingredients WHERE name='Cebolla')),
(101, (SELECT id FROM ingredients WHERE name='Queso cheddar')),
(101, (SELECT id FROM ingredients WHERE name='Salsa especial'));

-- Tabla Users (Usuarios)

-- Tabla Carts (Carrito)
