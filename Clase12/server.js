const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const { router, products, messages } = require('./routes/router.js');
const fs = require('fs');

const PORT = 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/', router);

fs.promises
  .readFile("./messages.text", "utf-8")
  .then((fileData) => {
    const array = JSON.parse(fileData);
    array.map((message) => {
      messages.push(message);
    });

  })
  .catch((err) => console.log(err));

const save = (messages) => {
	const fs = require("fs");
	fs.promises
	  .writeFile("./chat.txt", JSON.stringify(messages))
	  .then((data) => {
		return console.log(`Mensaje enviado exitosamente `);
	  })
	  .catch((error) => console.log(error));
  };

io.on('connection', socket => {
	io.sockets.emit('products', products);
	io.sockets.emit('chat', messages);
	socket.on('newProduct', newProduct => {
		products.push(newProduct);
		io.sockets.emit('products', products);
	})
	socket.on("new-message", (message) => {
		messages.push(message);
		save(messages);
	
		// console.log(messages);
		io.sockets.emit("new-chat-message", messages);
	  });
});

const server = httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', () => console.log(`Error: ${err}`));