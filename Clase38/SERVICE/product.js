const ProductoSchema = require('../MODELS/product.js')

function validationId(array, id) {
    const index = array.findIndex((object) => object.id == id);
    if (array[index]) {
      return true;
    } else {
      return false;
    }
  }
  
  async function getAllUsersService() {
    const getAllUsers = await ProductoSchema.find({});
    return getAllUsers;
  }
  
  async function getUserByIdService(num) {
    const getAllUsers = await ProductoSchema.find({});
    const validation = validationId(getAllUsers, num);
    if (validation) {
      let userById = await ProductoSchema.find({ _id: num });
      // userById = userById[0];
      //ME DEVUELVE EL ID SOLAMENTE, COMO DEBERIA HACER PARA QUE ME DEVUELVA TODO LO QUE TIENE???
      return userById;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  
  async function postUserService(username, password, name, address, age, phone, url) {
    try {
      const newUser = new ProductoSchema({
        username: username,
        password: password,
        name: name,
        address: address,
        age: age,
        phone: phone,
        url: url,
      });
      // console.log('newUser!!!!!!:', newUser) LLEGA ✅✅✅
      const userPosted = await newUser.postUserService();
      // console.log('userPosted:', userPosted); NO LLEGA ❌❌❌
      const aux = await ProductoSchema.find({ username: username });
      const userId = aux[0]._id;
      return userId;
    } catch (error) {
      console.log('error al postear usuario!');
      return 'se ha producido un error al postear un usuario nuevo';
    }
  }
  
  async function putUserService(id, username, password, name, address, age, phone, url) {
    //❌❌❌ NO FUNCIONA, ME DICE QUE USERNAME NO ESTA DEFINIDO
    const getAllUsers = await ProductoSchema.find({});
    const validation = validationId(getAllUsers, id);
    if (validation) {
      await ProductoSchema.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            username: username,
            password: password,
            name: name,
            address: address,
            age: age,
            phone: phone,
            url: url,
          },
        },
      );
      const aux = await ProductoSchema.find({ _id: id });
      return `Se actualizo el usuario ${aux[0].username}`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  
  async function deleteUserByIdService(id) {
    // console.log('id service:', id)
    const getAllUsers = await ProductoSchema.find({});
    const validation = validationId(getAllUsers, id);
    if (validation) {
      //no entra aca...❌❌❌❌
      await ProductoSchema.deleteOne({ _id: id });
      return `Se elimino con exito: ${id}`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  
  module.exports = { validationId, getAllUsersService, getUserByIdService, postUserService, putUserService, deleteUserByIdService };
  