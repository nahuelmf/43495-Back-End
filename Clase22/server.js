require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const mongoConnect = require("./db/db");
const Contenedor = require("./Containers/Contenedor");
const MongoContainer = require("./Containers/MongoContainer");
const losProductos = new Contenedor("./productos.json");
const losMensajes = new MongoContainer("mensajes");
const generateFakeProducts = require("./utils/generatorMockProduct");
const { normalize, schema, denormalize } = require('normalizr');


mongoConnect();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", async (socket) => {
  const mensajitos = await losMensajes.getAll();
  let productosFake = generateFakeProducts(5);
  console.log(`se conecto un usuario SERVER con el id: ${socket.id}`);
  let fecha = new Date();

  io.sockets.emit("products", productosFake);
  io.sockets.emit("mensajes", [...mensajitos]);


  

  socket.on("msj", (data) => {
    losMensajes.save({ data: data, fecha });
    
  });

  socket.on("product", (data) => {
    losProductos.save({ data: data, fecha });
  });
});




httpServer.listen(PORT, () =>
  console.log(`SERVER ON http://localhost:${PORT}`)
);
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

/* Normalizacion */

// 1. Definir esquemas

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new schema.Entity('messages', {
  author: authorSchema
})

const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema]
})

// 2. Aplicar Normalizacion 


const normalizarData = (data) => {
  const dataNormalizada = normalize({ id: "chatHistory", messages: data }, chatSchema);
  return dataNormalizada;
}

// 3. Normaliza mensajes

const normalizarMensajes = async () => {
  const messages = await losMensajes.getAll();
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;

}
// Corre cuando se conecta un cleinte
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
    // Muestra la lista completa de productos al cliente
    socket.emit("product-list", await generateFakeProducts());

  // Muestra el historial completo de mensajes al cliente
  socket.emit("msg-list", await normalizarMensajes());

  // Recibe prodcuto del cliente
  socket.on("product", async (data) => {

    // Guarda el producto nuevo en productos.json
    await datas.save(data);

    // Muestra el mensaje por consola
    console.log('Se recibio un producto nuevo', "producto:", data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.emit("product-list", await datas.getAll());

  });
   // Recibe mensaje del cliente
  socket.on("msg", async (data) => {

    // Guarda en mensaje nuevo en mensajes.json
    await dataMsg.save({ ...data, timestamp: timestamp });

    // Muestra el mensaje por consola
    console.log('Se recibio un msg nuevo', "msg:", data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.sockets.emit("msg-list", await normalizarMensajes());

  });
});