const express = require('express');
const Contenedor = require('../../Clase4/contenedor.js')

const app = express();
const PORT = 8080;
const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error on server ${err}`));

const productos = new Contenedor('productos.txt');

app.get('/', (req, res) => res.send('<h1 style="color: red">Bienvenidos a la tienda virtual de euhaN</h1> <img src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/logo2.png?alt=media&token=8b9c12e5-c409-4723-9dd8-e17ceec74276" alt="logo">'));

app.get('/productos', async (req, res) => {
    const mostrarProductos = await productos.getAll();
    res.send(mostrarProductos);
})

app.get('/productoRandom', async (req, res) => {
    const p = await productos.getAll();
    const numeroRandom = Math.floor(Math.random() * p.length);
    res.send(p[numeroRandom]);
})