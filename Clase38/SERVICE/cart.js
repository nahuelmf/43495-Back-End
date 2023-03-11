const modelCart = require('../MODELS/cart.js');

async function postCartService(username) {
  try {
    const newCart = new modelCart({
      username: username,
      productos: [],
    });
    await newCart.postCart();
    const cartPosted = await modelCart.find({ username: username });
    const id = cartPosted[0]._id;
    return id;
  } catch (error) {
    console.log('se ha producido un error al crear carrito');
    return 'se ha producido un error al crear carrito';
  }
}

async function getProductsFromCartService(idCart) {
  const getAllCarts = await modelCart.find({});
  //     console.log("lista:" , lista) // lista me trae object object en productos ❌❌❌
  const index = getAllCarts.findIndex((obj) => obj.id == idCart);
  return getAllCarts[index].productos;
}

async function addProductToCartService(id, product) {
  const getAllCarts = await modelCart.find({});
  const index = getAllCarts.findIndex((obj) => obj.id == id);
  getAllCarts[index].productos.push(product);
  await modelCart.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        productos: getAllCarts[index].productos,
      },
    },
  );
}

async function deleteProductFromCartService(id, id_prod) {
  const getAllCarts = await modelCart.find({});
  const index = getAllCarts.findIndex((obj) => obj.id == num);
  const indexProduct = getAllCarts[index].productos.findIndex((obj) => obj.id == id_prod);
  getAllCarts[index].productos.splice(indexProduct, 1);
  await modelCart.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        productos: getAllCarts[index].productos,
      },
    },
  );
}

module.exports = { postCartService, getProductsFromCartService, addProductToCartService, deleteProductFromCartService };
