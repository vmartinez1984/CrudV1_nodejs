const express = require('express')
const logger = require('morgan')
const bodyParser = require("body-parser")

const port = 3000
const app = express()

app.use(logger('tiny'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json(
        {
            mensaje: 'Hola mundo'
        }
    )
})

// repositorio
lista = [
    {
        'id': 1,
        'nombre': 'Coca',
        'precio': 200
    },
    {
        'id': 2,
        'nombre': 'Cuadro Lcd',
        'precio': 100
    }
]

function obtenerTodos() {
    return lista
}

var obtenerPorId = function (id) {
    let lista = obtenerTodos()
    let item = lista.filter(x => x.id == id)
    return item[0]
}

var agregarProducto = (producto) => {
    producto.id = lista.length + 1
    lista.push(producto)
}

var actualizarProducto = (id, producto) => {
    var item = obtenerPorId(id)
    item.nombre = producto.nombre
    item.precio = producto.precio
}

var borrarProducto = (id) => {
    lista = lista.filter(x=> x.id != id)
}
//end repositorio

app.get('/api/productos', (req, res) => {
    let lista = obtenerTodos()
    res.json(lista)
})

app.get('/api/productos/:id', (req, res) => {
    console.log(req.params)
    let id = req.params.id
    let item = obtenerPorId(id)
    res.status(200).json(item)
})

app.post('/api/productos', (req, res) => {
    console.log(req.body)
    agregarProducto(req.body)
    res.status(201).json(
        {
            //id: 3,
            //encodedKey: "",
            fechaDeRegistro: new Date()
        }
    )
})

app.put('/api/productos/:id', (req, res) => {
    let id = req.params.id
    actualizarProducto(id, req.body)
    res.status(202).json(
        {        
            fechaDeRegistro: new Date()
        }
    )
})

app.listen(port, () => {
    console.log("http://localhost:" + port)
})