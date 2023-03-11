const { postCartService, getProductsFromCartService, addProductToCartService, deleteProductFromCartService } = require('../SERVICE/cart.js');
const moment = require('moment');

async function postCartController(req, res) {
  try {
    const timestampCart = moment().format('DD / MM / YYYY, h:mm:ss');
    let idCart = await postCartService(timestampCart);

    res.json(`Se creo un carrito nuevo con id ${idCart}`);
  } catch (error) {
    res.json('error al crear carrito', error);
  }
}

async function getProductsFromCartController(req, res) {
  const { id } = req.params;
  const allProductsFromCart = await getProductsFromCartService(id);

  res.json(allProductsFromCart);
}

async function addProductToCartController(req, res) {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productAddedCart = await addProductToCartService(id_prod, 'product'); //?????❌❌❌❌

  } catch (error) {

  }
}

// try {
//   let { id_prod } = req.params;
//   let { id } = req.params;
//   let productAddedCart = await product.getById(id_prod, 'products');
//   if (
//     (await cart.getById(id, 'carts')) == 'No existe el número de id elegido'
//   ) {
//     res.json('error: "No existe ningún carrito con ese número de id"');
//   } else if (productAddedCart == 'No existe el número de id elegido') {
//     res.json('error: "No existe ningún producto con ese número de id"');
//   } else {
//     cart.addProductToCart(id, productAddedCart, id_prod);
//     res.json(
//       `Se añadio el producto ${productAddedCart.name} al carrito ${id}`
//     );
//   }
// } catch {
//   res.json('error');
// }
// });

async function deleteProductFromCartController(req, res) {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;

  } catch (error) {
    
  }
}

// cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
//   try {
//     let { id_prod } = req.params;
//     let { id } = req.params;
//     let productoCarrito = await product.getById(id_prod, 'products'); ????????
//     if (
//       (await cart.getById(id, 'carts')) == 'No existe el número de id elegido'
//     ) {
//       res.json('error: "No existe ningún carrito con ese número de id"');
//     } else if (productoCarrito == 'No existe el número de id elegido') {
//       res.json('error: "No existe ningún producto con ese número de id"');
//     } else {
//       await cart.deleteProductFromCart(id, id_prod);
//       res.json(`Se eliminó el producto del carrito`);
//     }
//   } catch (e) {
//     console.log(e);
//     res.json('error');
//   }
// });


module.exports = { postCartController, getProductsFromCartController, addProductToCartController, deleteProductFromCartController };
