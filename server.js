const express = require("express");
const Contenedor = require("./classContainer");
let ListProducts = new Contenedor("./productos.txt");

const app = express();
const port = process.env.PORT || 8082;

// Rutas
app.get("/", (req, res) => {
  res.send(`<h1 style="color: grey">Bienvenidos al servidor express!!</h1>`);
});

// Me devuelve un array con los productos disponibles en el server
app.get("/productos", async (req, res) => {
  let dataFile = await ListProducts.getAll();

  res.json(dataFile);
  //   res.send(dataFile);
});

// Me devuelve un producto al azar
app.get("/productoRandom", async (req, res) => {
  let dataFile = await ListProducts.getAll();
  let productRandom = dataFile[Math.floor(Math.random() * dataFile.length)];
  res.json(productRandom);
});

// listen port
app.listen(port, () => {
  console.log("Server run on port " + port);
});