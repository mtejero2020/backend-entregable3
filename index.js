const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8088;
const emoji = require('node-emoji');
let Container = new require('./container');
let container = new Container('productos.txt');

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send('<h1>BIENVENIDO AL EJERCICIO ENTREGABLE 3!<h1>');
});


app.get("/productos", async(req, res) => {
    let punto1a = await container.getAll();
    res.send(punto1a);
});

app.get("/productoRandom", async(req, res) => {
    let max = 4,
        min = 1;
    let id = Math.floor(Math.random() * (max - min) + min);
    console.log(id);
    let punto1b = await container.getById(id);
    console.log(punto1b);
    res.send(punto1b);
});


app.listen(PORT, () => {
    return console.log(emoji.get('coffee'), `Conectado al servidor, puerto ${PORT}`);
});