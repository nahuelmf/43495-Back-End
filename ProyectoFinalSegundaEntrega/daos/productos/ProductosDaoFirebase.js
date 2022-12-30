const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')


class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("products")
    }
}


module.exports= ProductosDaoFirebase