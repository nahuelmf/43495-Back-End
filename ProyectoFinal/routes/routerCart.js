import express from "express";
import { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } from "../controllers/controllerCart.js";
const routerCarts = express.Router();

//Agregar un carrito
routerCarts.post('/', (req, res) => addCart(req, res));

//Eliminar carrito
routerCarts.delete('/:id', (req, res) => deleteCart(req, res));

//Obtener productos de un carrito específico
routerCarts.get('/:id/products', (req, res) => getProducts(req, res));

//Add a product to a cart
routerCarts.post('/:id/products', (req, res) => addProductToCart(req, res));

//Eliminar un producto de un carrito
routerCarts.delete('/:id/products/:id_prod', (req, res) => deleteProduct(req, res));

export default routerCarts;