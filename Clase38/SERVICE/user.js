const modelUser = require('../MODELS/user.js');

function validationId(array, id) {
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

async function getAllUsersService() {
  const getAllUsers = await modelUser.find({});
  return getAllUsers;
}

async function getUserByIdService(num) {
  const getAllUsers = await modelUser.find({});
  const validation = validationId(getAllUsers, num);
  if (validation) {
    let userById = await modelUser.find({ _id: num });
    // userById = userById[0];
    //ME DEVUELVE EL ID SOLAMENTE, COMO DEBERIA HACER PARA QUE ME DEVUELVA TODO LO QUE TIENE???
    return userById;
  } else {
    return 'no existe el numero de id elegido';
  }
}

async function postUserService(username, password, name, address, age, phone, url) {
  try {
    const newUser = new modelUser({
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
    const aux = await modelUser.find({ username: username });
    const userId = aux[0]._id;
    return userId;
  } catch (error) {
    console.log('error al postear usuario!');
    return 'se ha producido un error al postear un usuario nuevo';
  }
}

async function putUserService(id, username, password, name, address, age, phone, url) {
  //❌❌❌ NO FUNCIONA, ME DICE QUE USERNAME NO ESTA DEFINIDO
  const getAllUsers = await modelUser.find({});
  const validation = validationId(getAllUsers, id);
  if (validation) {
    await modelUser.updateOne(
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
    const aux = await modelUser.find({ _id: id });
    return `Se actualizo el usuario ${aux[0].username}`;
  } else {
    return 'no existe el numero de id elegido';
  }
}

async function deleteUserByIdService(id) {
  // console.log('id service:', id)
  const getAllUsers = await modelUser.find({});
  const validation = validationId(getAllUsers, id);
  if (validation) {
    //no entra aca...❌❌❌❌
    await modelUser.deleteOne({ _id: id });
    return `Se elimino con exito: ${id}`;
  } else {
    return 'no existe el numero de id elegido';
  }
}

module.exports = { validationId, getAllUsersService, getUserByIdService, postUserService, putUserService, deleteUserByIdService };
