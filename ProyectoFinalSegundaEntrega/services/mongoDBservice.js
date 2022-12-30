const mongoose = require("mongoose");
const config = require("../config/options");




const init = async () => {
  try {
    mongoose.connect(`mongodb+srv://nahuelmf:nawueh0731@cluster0.irezwt9.mongodb.net/test`,{
      useNewUrlParser: true,
    });
    console.log(`Conectado a MongoDb `);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = init;
