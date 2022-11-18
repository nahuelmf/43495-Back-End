import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/controllerProducts.js";
const routerProducts = express.Router();

//Obtener todos los productos o producto seleccionado
routerProducts.get('/:id?', (req, res) => getProducts(req, res));

//Agregar producto
routerProducts.post('/', (req, res) => addProduct(req, res));

//Actualizar producto
routerProducts.put('/:id', (req, res) => updateProduct(req, res));

//Eliminar producto
routerProducts.delete('/:id', (req, res) => deleteProduct(req, res));

export default routerProducts;