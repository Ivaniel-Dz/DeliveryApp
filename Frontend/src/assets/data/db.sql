-- Datos a Ingresar a la Base de datos
use delivery;

-- 1. Inserta Categorías:
INSERT INTO categories (id, name, image) VALUES
(1, 'Hamburguesas', 'https://i.ibb.co/7xvy1wXF/burgers.jpg'),
(2, 'Pizzas', 'https://i.ibb.co/QFNk7DFT/pizzas.jpg'),
(3, 'Tacos', 'https://i.ibb.co/4Z10d9f0/tacos.jpg'),
(4, 'Ensaladas', 'https://i.ibb.co/8n5TzRN1/ensaladas.jpg'),
(5, 'Postres', 'https://i.ibb.co/FqH5YRZj/postres.webp'),
(6, 'Bebidas', 'https://i.ibb.co/FbY2JHPh/bebidas.webp');

select * from categories;

-- 2. Insertas Comidas:
INSERT INTO foods (id, categoryId, name, price, rating, image, description, calories, preparationTime) VALUES
(101, 1, 'Hamburguesa Clásica', 8.99, 4.5, 'https://i.ibb.co/TxQ9SXyt/burger-clasica.jpg', 'Deliciosa hamburguesa con carne de res, lechuga, tomate, cebolla, queso cheddar y nuestra salsa especial.', 650, '15-20 min'),
(102, 1, 'Hamburguesa con Queso', 9.99, 4.7, 'https://i.ibb.co/Mx5W68x3/burger-queso.jpg', 'Hamburguesa con doble queso cheddar derretido, carne jugosa y salsa especial.', 750, '15-20 min'),
(103, 1, 'Hamburguesa BBQ', 10.49, 4.6, 'https://i.ibb.co/mkyLJ8P/burger-bbq.jpg', 'Hamburguesa con salsa BBQ, cebolla caramelizada y tocino crujiente.', 780, '15-20 min'),
(104, 1, 'Hamburguesa Vegana', 9.49, 4.2, 'https://i.ibb.co/hxR6g4P6/burger-vegana.webp', 'Hamburguesa con patty vegetal, lechuga, tomate y aguacate.', 600, '15-20 min'),
(105, 1, 'Hamburguesa Picante', 9.99, 4.4, 'https://i.ibb.co/N6SWwqg9/burger-picante.webp', 'Hamburguesa con jalapeños, salsa picante y queso pepper jack.', 720, '15-20 min'),
(106, 2, 'Pizza Margarita', 10.99, 4.6, 'https://i.ibb.co/MxQszKWj/pizza-margarita.webp', 'Pizza clásica con salsa de tomate, mozzarella y albahaca.', 700, '15-20 min'),
(107, 2, 'Pizza Pepperoni', 11.49, 4.7, 'https://i.ibb.co/pBVMSq75/pizza-peperoni.webp', 'Pizza con abundante pepperoni y queso fundido.', 800, '15-20 min'),
(108, 2, 'Pizza Hawaiana', 11.99, 4.3, 'https://i.ibb.co/BHTxDp81/pizza-hawaiana.jpg', 'Pizza con jamón y piña sobre base de queso mozzarella.', 750, '15-20 min'),
(109, 2, 'Pizza Vegetariana', 10.49, 4.5, 'https://i.ibb.co/S70HLD5v/pizza-vegetariana.jpg', 'Pizza con champiñones, pimientos, cebolla y aceitunas.', 690, '15-20 min'),
(110, 2, 'Pizza Cuatro Quesos', 12.49, 4.8, 'https://i.ibb.co/QjMvm2PB/pizza-4quesos.jpg', 'Pizza con mezcla de mozzarella, parmesano, gorgonzola y cheddar.', 830, '15-20 min'),
(111, 3, 'Taco al Pastor', 10.99, 4.3, 'https://i.ibb.co/kg0sXKhh/taco-pastor.jpg', 'Tacos tradicionales de cerdo marinado con piña y cebolla.', 480, '15-20 min'),
(112, 3, 'Taco de Asada', 9.49, 4.6, 'https://i.ibb.co/WNxWLrX9/taco-asada.webp', 'Tacos con carne asada, guacamole y salsa.', 510, '15-20 min'),
(113, 3, 'Taco de Pollo', 8.99, 4.4, 'https://i.ibb.co/0yvkvKBZ/taco-pollo.jpg', 'Tacos de pollo a la parrilla con pico de gallo.', 460, '15-20 min'),
(114, 3, 'Taco Vegano', 9.29, 4.2, 'https://i.ibb.co/zHPKqjtJ/taco-vegano.jpg', 'Taco con tofu marinado y vegetales frescos.', 430, '15-20 min'),
(115, 3, 'Taco de Camarón', 11.49, 4.7, 'https://i.ibb.co/rgQvXfK/taco-camaron.jpg', 'Tacos de camarón empanizado con col y aderezo.', 500, '15-20 min'),
(116, 4, 'Ensalada César', 7.99, 4.5, 'https://i.ibb.co/zHRCqb3P/ensalada-cesar.webp', 'Ensalada clásica con lechuga romana, crutones y aderezo césar.', 350, '15-20 min'),
(117, 4, 'Ensalada Griega', 8.49, 4.6, 'https://i.ibb.co/PzFf94tH/ensalada-griega.jpg', 'Mezcla de vegetales con queso feta y aceitunas negras.', 320, '15-20 min'),
(118, 4, 'Ensalada de Pollo', 9.49, 4.4, 'https://i.ibb.co/hFY96HfL/ensalada-pollo.jpg', 'Ensalada con pechuga de pollo a la parrilla y aderezo ranch.', 400, '15-20 min'),
(119, 4, 'Ensalada Vegana', 8.99, 4.3, 'https://i.ibb.co/SjMfbfk/ensalada-vegana.webp', 'Mix de hojas verdes con quinoa, aguacate y tomate cherry.', 390, '15-20 min'),
(120, 4, 'Ensalada de Atún', 9.29, 4.2, 'https://i.ibb.co/67xhr9NQ/ensalada-atun.webp', 'Ensalada con atún, huevo cocido y mayonesa ligera.', 410, '15-20 min'),
(121, 5, 'Cheesecake', 5.99, 4.8, 'https://i.ibb.co/nMDxfRFr/cheesecake.webp', 'Pastel de queso suave con base de galleta.', 450, '15-20 min'),
(122, 5, 'Brownie', 4.99, 4.6, 'https://i.ibb.co/qLSV11HW/brownie.jpg', 'Brownie de chocolate húmedo con nueces.', 430, '15-20 min'),
(123, 5, 'Helado de Vainilla', 3.99, 4.4, 'https://i.ibb.co/4Zhb3QPD/helado-vainilla.webp', 'Helado cremoso con sabor a vainilla natural.', 380, '15-20 min'),
(124, 5, 'Tiramisú', 6.49, 4.7, 'https://i.ibb.co/CKY914cg/tiramisu.webp', 'Postre italiano con café, queso mascarpone y cacao.', 470, '15-20 min'),
(125, 5, 'Ensalada de Fruta', 4.49, 4.2, 'https://i.ibb.co/6chDtY4b/ensalada-frutas.jpg', 'Selección de frutas frescas de temporada acompañada con helado de vanilla.', 200, '15-20 min'),
(126, 6, 'Agua Mineral', 1.99, 4.3, 'https://i.ibb.co/pvBLGtt4/agua-mineral.jpg', 'Agua con gas refrescante.', 0, '15-20 min'),
(127, 6, 'Jugo de Naranja', 2.99, 4.5, 'https://i.ibb.co/dsVG95MV/jugo-naranja.webp', 'Jugo natural de naranja recién exprimido.', 110, '15-20 min'),
(128, 6, 'Refresco', 1.99, 4.1, 'https://i.ibb.co/3YP3xpyY/refrescos.webp', 'Refresco de cola clásico.', 140, '15-20 min'),
(129, 6, 'Café Helado', 3.49, 4.6, 'https://i.ibb.co/9kmG0WYX/cafe-helado.jpg', 'Café frío con leche y hielo.', 120, '15-20 min'),
(130, 6, 'Té Verde', 2.49, 4.4, 'https://i.ibb.co/Cpmcx5RY/te-verde.jpg', 'Té verde natural servido frío.', 50, '15-20 min');

select * from foods;

-- 3. Insertar Ingredientes:
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
('Té verde'),
 ('Pepino'),
 ('Vainilla'),
 ('Sodas'),
 ('Helado');

select * from ingredients;

-- 4. Insertar Relación entre Comidas e Ingredientes:
-- Hamburguesa Clásica (id=101)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(101, (SELECT id FROM ingredients WHERE name='Carne de res')),
(101, (SELECT id FROM ingredients WHERE name='Pan')),
(101, (SELECT id FROM ingredients WHERE name='Lechuga')),
(101, (SELECT id FROM ingredients WHERE name='Tomate')),
(101, (SELECT id FROM ingredients WHERE name='Cebolla')),
(101, (SELECT id FROM ingredients WHERE name='Queso cheddar')),
(101, (SELECT id FROM ingredients WHERE name='Salsa especial'));

-- Hamburguesa con Queso (id=102)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(102, (SELECT id FROM ingredients WHERE name='Carne de res')),
(102, (SELECT id FROM ingredients WHERE name='Pan')),
(102, (SELECT id FROM ingredients WHERE name='Doble queso cheddar')),
(102, (SELECT id FROM ingredients WHERE name='Salsa especial'));

-- Hamburguesa BBQ (id=103)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(103, (SELECT id FROM ingredients WHERE name='Carne de res')),
(103, (SELECT id FROM ingredients WHERE name='Salsa BBQ')),
(103, (SELECT id FROM ingredients WHERE name='Cebolla caramelizada')),
(103, (SELECT id FROM ingredients WHERE name='Tocino'));

-- Hamburguesa Vegana (id=104)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(104, (SELECT id FROM ingredients WHERE name='Patty vegetal')),
(104, (SELECT id FROM ingredients WHERE name='Lechuga')),
(104, (SELECT id FROM ingredients WHERE name='Tomate')),
(104, (SELECT id FROM ingredients WHERE name='Aguacate'));

-- Hamburguesa Picante (id=105)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(105, (SELECT id FROM ingredients WHERE name='Carne de res')),
(105, (SELECT id FROM ingredients WHERE name='Jalapeños')),
(105, (SELECT id FROM ingredients WHERE name='Salsa picante')),
(105, (SELECT id FROM ingredients WHERE name='Queso pepper jack'));

-- Pizza Margarita (id=106)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(106, (SELECT id FROM ingredients WHERE name='Salsa de tomate')),
(106, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(106, (SELECT id FROM ingredients WHERE name='Albahaca'));

-- Pizza Pepperoni (id=107)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(107, (SELECT id FROM ingredients WHERE name='Salsa de tomate')),
(107, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(107, (SELECT id FROM ingredients WHERE name='Pepperoni'));

-- Pizza Hawaiana (id=108)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(108, (SELECT id FROM ingredients WHERE name='Jamón')),
(108, (SELECT id FROM ingredients WHERE name='Piña')),
(108, (SELECT id FROM ingredients WHERE name='Mozzarella'));

-- Pizza Vegetariana (id=109)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(109, (SELECT id FROM ingredients WHERE name='Champiñones')),
(109, (SELECT id FROM ingredients WHERE name='Pimientos')),
(109, (SELECT id FROM ingredients WHERE name='Cebolla')),
(109, (SELECT id FROM ingredients WHERE name='Aceitunas'));

-- Pizza Cuatro Quesos (id=110)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(110, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(110, (SELECT id FROM ingredients WHERE name='Parmesano')),
(110, (SELECT id FROM ingredients WHERE name='Gorgonzola')),
(110, (SELECT id FROM ingredients WHERE name='Cheddar'));

-- Taco al Pastor (id=111)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(111, (SELECT id FROM ingredients WHERE name='Cerdo')),
(111, (SELECT id FROM ingredients WHERE name='Piña')),
(111, (SELECT id FROM ingredients WHERE name='Cebolla')),
(111, (SELECT id FROM ingredients WHERE name='Tortilla de maíz'));

-- Taco de Asada (id=112)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(112, (SELECT id FROM ingredients WHERE name='Carne asada')),
(112, (SELECT id FROM ingredients WHERE name='Guacamole')),
(112, (SELECT id FROM ingredients WHERE name='Salsa')),
(112, (SELECT id FROM ingredients WHERE name='Tortilla de maíz'));

-- Taco de Pollo (id=113)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(113, (SELECT id FROM ingredients WHERE name='Pollo')),
(113, (SELECT id FROM ingredients WHERE name='Pico de gallo')),
(113, (SELECT id FROM ingredients WHERE name='Tortilla de maíz'));

-- Taco Vegano (id=114)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(114, (SELECT id FROM ingredients WHERE name='Tofu')),
(114, (SELECT id FROM ingredients WHERE name='Verduras')),
(114, (SELECT id FROM ingredients WHERE name='Salsa verde'));

-- Taco de Camarón (id=115)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(115, (SELECT id FROM ingredients WHERE name='Camarón')),
(115, (SELECT id FROM ingredients WHERE name='Col')),
(115, (SELECT id FROM ingredients WHERE name='Aderezo')),
(115, (SELECT id FROM ingredients WHERE name='Tortilla de maíz'));

-- Ensalada César (id=116)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(116, (SELECT id FROM ingredients WHERE name='Lechuga romana')),
(116, (SELECT id FROM ingredients WHERE name='Crutones')),
(116, (SELECT id FROM ingredients WHERE name='Aderezo césar')),
(116, (SELECT id FROM ingredients WHERE name='Parmesano'));

-- Ensalada Griega (id=117)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(117, (SELECT id FROM ingredients WHERE name='Pepino')),
(117, (SELECT id FROM ingredients WHERE name='Tomate')),
(117, (SELECT id FROM ingredients WHERE name='Queso feta')),
(117, (SELECT id FROM ingredients WHERE name='Aceitunas'));

-- Ensalada de Pollo (id=118)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(118, (SELECT id FROM ingredients WHERE name='Pollo')),
(118, (SELECT id FROM ingredients WHERE name='Lechuga')),
(118, (SELECT id FROM ingredients WHERE name='Zanahoria')),
(118, (SELECT id FROM ingredients WHERE name='Aderezo ranch'));

-- Ensalada Vegana (id=119)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(119, (SELECT id FROM ingredients WHERE name='Quinoa')),
(119, (SELECT id FROM ingredients WHERE name='Aguacate')),
(119, (SELECT id FROM ingredients WHERE name='Espinaca')),
(119, (SELECT id FROM ingredients WHERE name='Tomate cherry'));

-- Ensalada de Atún (id=120)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(120, (SELECT id FROM ingredients WHERE name='Atún')),
(120, (SELECT id FROM ingredients WHERE name='Huevo')),
(120, (SELECT id FROM ingredients WHERE name='Lechuga')),
(120, (SELECT id FROM ingredients WHERE name='Mayonesa'));

-- Cheesecake (id=121)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(121, (SELECT id FROM ingredients WHERE name='Queso crema')),
(121, (SELECT id FROM ingredients WHERE name='Galleta')),
(121, (SELECT id FROM ingredients WHERE name='Azúcar')),
(121, (SELECT id FROM ingredients WHERE name='Mermelada'));

-- Brownie (id=122)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(122, (SELECT id FROM ingredients WHERE name='Chocolate')),
(122, (SELECT id FROM ingredients WHERE name='Nueces')),
(122, (SELECT id FROM ingredients WHERE name='Harina')),
(122, (SELECT id FROM ingredients WHERE name='Azúcar'));

-- Helado de Vainilla (id=123)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(123, (SELECT id FROM ingredients WHERE name='Leche')),
(123, (SELECT id FROM ingredients WHERE name='Vainilla')),
(123, (SELECT id FROM ingredients WHERE name='Azúcar'));

-- Tiramisú (id=124)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(124, (SELECT id FROM ingredients WHERE name='Mascarpone')),
(124, (SELECT id FROM ingredients WHERE name='Café')),
(124, (SELECT id FROM ingredients WHERE name='Bizcocho')),
(124, (SELECT id FROM ingredients WHERE name='Cacao'));

-- Ensalada de Fruta (id=125)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(125, (SELECT id FROM ingredients WHERE name='Frutas variadas')),
(125, (SELECT id FROM ingredients WHERE name='Helado'));

-- Agua Mineral (id=126)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(126, (SELECT id FROM ingredients WHERE name='Agua con gas'));

-- Jugo de Naranja (id=127)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(127, (SELECT id FROM ingredients WHERE name='Naranja'));

-- Refresco (id=128)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(128, (SELECT id FROM ingredients WHERE name='Sodas'));

-- Café Helado (id=129)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(129, (SELECT id FROM ingredients WHERE name='Café')),
(129, (SELECT id FROM ingredients WHERE name='Leche')),
(129, (SELECT id FROM ingredients WHERE name='Hielo'));

-- Té Verde (id=130)
INSERT INTO foodingredients (foodId, ingredientId) VALUES
(130, (SELECT id FROM ingredients WHERE name='Té verde')),
(130, (SELECT id FROM ingredients WHERE name='Agua'));

select * from foodingredients;

-- 5. Insertar Usuarios:
-- "Se realiza desde la aplicación"