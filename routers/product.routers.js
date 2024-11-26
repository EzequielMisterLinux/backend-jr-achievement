import express from "express";
import AgregarProducto from "../controllers/agregar.productos.js";
import ObteniendoTodosLosProductos from "../controllers/ver-todos-productos.js";
import BorrandoProducto from "../controllers/delete.productos.js";
import ActualizarProducto from "../controllers/actualizando.producto.js";
import CreateUser from "../controllers/register.user.js";
import LoginUser from "../controllers/login.user.js";
import verifyToken from "../controllers/verifyToken-controller.js";
import Protected from "../middleware/protected.js";
import logoutUser from "../controllers/logout.js";
import getAllUsers from "../controllers/getAllUsers.controller.js";
import UpdateUser from "../controllers/UpdateUser.controller.js";

const rutasDeLosProductos = express.Router();


rutasDeLosProductos.post("/crear-usuario", Protected, CreateUser)

rutasDeLosProductos.get("/get-users", Protected ,getAllUsers)

rutasDeLosProductos.put("/users-update/:id",Protected, UpdateUser)

rutasDeLosProductos.post("/login", LoginUser)

rutasDeLosProductos.get("/verify-token", verifyToken)



rutasDeLosProductos.post("/logout", logoutUser)

/**
 * @swagger
 * /crear-producto:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponibilidad:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Todos los campos son requeridos
 */
rutasDeLosProductos.post("/crear-producto", Protected, AgregarProducto);

/**
 * @swagger
 * /obtener-productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 */
rutasDeLosProductos.get("/obtener-productos", Protected, ObteniendoTodosLosProductos);

/**
 * @swagger
 * /borrar-productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *          description: El id para borrar el producto es requerido
 *       500:
 *         description: Error al borrar el producto
 */
rutasDeLosProductos.delete("/borrar-productos/:id", Protected, BorrandoProducto);

/**
 * @swagger
 * /actualizar-productos/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponibilidad:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       500:
 *         description: Error al actualizar el producto
 */
rutasDeLosProductos.put("/actualizar-productos/:id", Protected ,ActualizarProducto);

export default rutasDeLosProductos;
