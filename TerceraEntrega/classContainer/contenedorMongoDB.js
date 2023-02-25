const mongoose = require('mongoose');
const modelCart = require('../models/modelCart.js');
const ModelProduct = require('../models/modelProduct.js');
const logger = require('../utils/loggerWinston');

class contenedorMongoDB {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (err) {
      throw logger.error(err, 'no se pueden mostrar todos los mensajes');
    }
  }

  async getByName(name) {
    const result = await this.model.find({ title: name }, { _id: false, __v: false });
    return result;
  }

  async save(title, price, thumbnail) {
    try {
      const newProduct = new ModelProduct({
        title: title,
        price: price,
        thumbnail: thumbnail,
      });
      await newProduct.save();
    } catch (error) {
      throw logger.error(error, 'se ha producido un error');
    }
  }

  async getCartProducts(username) {
    const userCart = await this.model.find({ username: username }, { _id: false, __v: false });
    if (userCart.length > 0) {
      return userCart[0].productos;
    } else {
      return false;
    }
  }

  async addToCart(username, product) {
    const userCart = await this.model.find({ username: username }, { _id: false, __v: false });
    if (userCart.length > 0) {
      const productsCart = userCart[0].productos;
      productsCart.push(product);
      await this.model.updateOne(
        { username: username },
        {
          $set: {
            productos: productsCart,
          },
        }
      );
    } else {
      try {
        const newCart = new modelCart({
          username: username,
          productsCart: product,
        });
        await newCart.save();
      } catch {
        logger.log('error', 'Se ha producido un error');
        return 'Se ha producido un error';
      }
    }
  }
  async deleteFromCart(username, product) {
    const userCart = await this.model.find({ username: username }, { _id: false, __v: false });
    const productsCart = userCart[0].productos;
    const indexProduct = productsCart.findIndex((object) => object.title == product.title);
    productsCart.splice(indexProduct, 1);
    await this.model.updateOne(
      { username: username },
      {
        $set: {
          products: productsCart,
        },
      }
    );
  }
  async emptyCart(username) {
    await this.model.deleteOne({ username: username });
  }
}

module.exports = contenedorMongoDB;
