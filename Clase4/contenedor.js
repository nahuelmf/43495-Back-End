const { promises: fs } = require("fs");

let id;

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async save(object) {
    const productos = await this.getAll();
    try {
      id = productos.length +1
      productos.push({ id, ...object });
      await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
      return id;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {

    try{
      const productos = await this.getAll();
       const producto =  productos.find(product => product.id === id);
     console.log(JSON.stringify(producto, null, 2));

    }catch (e) {
      console.log(e)
    }
  }
  async getAll() {
    try {
      const productos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(productos);
    } catch (e) {
      return [];
    }
  }
  async deleteById(id) {
    try{
      const productos = await this.getAll();
      const newArrProductos = productos.filter(producto => producto.id !== id)
      await fs.writeFile(this.ruta, JSON.stringify(newArrProductos, null, 2))
    }catch (e) {
      console.log(e)
    }
  }
  async deleteAll (){
    try{
      const productos = []
      await fs.writeFile(this.ruta, JSON.stringify(productos))
    }catch (e) {
      console.log(e)
    }
  }
}

const contenedor = new Contenedor("./products.json");

//contenedor.save({ title: "Procesador AMD Athlon 3000G", price:900, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_620009-MLA41419343230_042020-O.webp"});
 //contenedor.getById(2)
//contenedor.deleteById(3)
//contenedor.deleteAll() 
contenedor.getAll()