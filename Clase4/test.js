console.clear()
const Contenedor = require('./Contenedor.js');

const productos = new Contenedor('productos.txt');

const test = async () => {
	const data = await productos.save({ title: 'Procesador Intel Celeron G5905', price: 7199, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_677873-MLA44347499239_122020-O.webp'  });
	console.log(productos.objects);

}

test();