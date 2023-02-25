const contenedorMongoDB = require('../classContainer/contenedorMongoDB.js');
const modelCart = require('../models/modelCart.js');

class CarritosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super({
      name: 'carts', //name collection
      schema: modelCart.CartsSchema,
    });
  }
}

module.exports = CarritosDaoMongoDB;
