const express = require('express');
const routerCart = express.Router();

const { postCartController, getProductsFromCartController, addProductToCartController, deleteProductFromCartController } = require('../CONTROLLER/cart.js')

routerCart.post('/carts', postCartController);
routerCart.get('/carts/:id/productos', getProductsFromCartController);
routerCart.post('/carts/:id/productos/:id_prod', addProductToCartController);
routerCart.delete('/carts/:id/productos/:id_prod', deleteProductFromCartController);

module.exports = routerCart;
