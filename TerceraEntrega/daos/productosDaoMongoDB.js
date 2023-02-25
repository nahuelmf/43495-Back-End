const contenedorMongoDB = require('../classContainer/contenedorMongoDB.js');
const modelProduct = require('../models/modelProduct.js');

class ProductosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super({
      name: 'products', //name collection
      schema: modelProduct.ProductsSchema,
    });
  }
}

module.exports = ProductosDaoMongoDB;
