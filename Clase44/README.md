# Desafío 22

## Reformar para usar GraphQL

### Consignas

- En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.
- Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
- Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

----

En la carpeta `graphql`, dentro de src se crearon todos los archivos necesarios para utilizar **GraphQL**.
```console
graphql
├── inputs
│   ├── ProductoNew.input.js
│   └── ProductoUpdate.input.js
├── mutations
│   ├── CreateCarrito.mutation.js
│   ├── CreateProducto.mutation.js
│   ├── DeleteCarritoById.mutation.js
│   ├── DeleteProductById.mutation.js
│   ├── DeleteProductFromCart.mutation.js
│   ├── SaveProductToCart.mutation.js
│   └── UpdateProductById.mutation.js
├── queries
│   ├── GetAllCarritos.query.js
│   ├── GetAllProductos.query.js
│   ├── GetAllProductsFromCartById.query.js
│   └── GetProductById.query.js
├── Schema.js
└── types
    ├── Carrito.type.js
    └── Producto.type.js
```

Para acceder a GraphiQL ingresa a

### `http://localhost:3031/graphql`

# Contenidos
1. [Consigna](#consigna)
2. [Querys & Mutations Producto](#producto)
3. [Querys & Mutations Mensajes](#mensajes)
---
## CONSIGNA
<a name="consigna"></a>

En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL. Si tuviesemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

GRAPHQL QUERYS / MUTATIONS /

### PRODUCTOS
<a name="producto"></a>

##### Endpoint: "/api/productos"

Query:<br>
- getProducts:<br>
query{<br>
  getProducts{<br>
    title,<br>
    price,<br>
    thumbnail<br>
  }
}<br>

- getById:<br>
query{<br>
  getById(_id:"612ad1846b787172e4859d05") -> Ejemplo _id: Type String<br>
  {<br>
    title,<br>
    price,<br>
    thumbnail<br>
  }
}<br>

- createProduct:<br>
mutation {<br>
  createProduct(<br>
    title: "Auriculares gamer Razer Kraken Ultimate negro con luz rgb LED",<br>
    price: 62715,<br>
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_854658-MLA44772246855_022021-O.webp"<br>
  ){<br>
    title,<br>
    price<br>
    thumbnail<br>
  }
}<br>

- updateProduct:<br>
mutation{<br>
  updateProduct(input:{<br>
    _id:"612be3954ccd7be9893c3762",<br>
    title:"Auriculares gamer inalámbricos Logitech G Series G935 negro y azul con luz rgb LED",<br>
    price: 50376,<br>
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_758605-MLA41084580001_032020-O.webp"<br>
  })
}<br>

- deleteProduct:<br>
mutation {<br>
  deleteProduct(_id: "612be38c4ccd7be9893c3761") -> Ejemplo _id: Type String<br>
}

---

### MENSAJES
<a name="mensajes"></a>

##### Endpoint: "/mensajes"

- findAllMsg<br>
query{<br>
  findAllMsg{<br>
    nombre,<br>
    email,<br>
    edad<br>
  }
}<br>

- addMsg<br>
mutation{<br>
  addMsg(input:{<br>
    nombre: "Nahuel",<br>
    email: "nahuelmf.sl@gmail..com",<br>
    apellido: "Figueroa",<br>
    edad: 30,<br>
    alias: "Nahue",<br>
    avatar: "img.jpg",<br>
    text: "Test GQL"<br>
  }){<br>
    nombre,<br>
    text<br>
  }
}<br>
