const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});
//                                 nombre de la coleccion (no de la base de datos!!)
const modelProduct = model('products', ProductoSchema);
module.exports = ProductoSchema;

//SI EXPORTO MODELPRODUCT, EN EL LOCALHOST NO ME MUESTRA LA BASE DE DATOS, DE ESTA MANERA SI
//PERO NO PUEDO USAR LOS METODOS DE MONGOOSE CON PRODUCTOSCHEMA... ENTONCES????❌❌❌❌❌❌❌❌❌
