const { Schema, model } = require('mongoose');

const CartsSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  productsCart: [{ type: Object }],
});

const modelCart = model('carts', CartsSchema);
module.exports = modelCart;
