const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and customized views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Onat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Onat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Onat",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(req.query.address, (error, { location }) => {
    if (error) {
      return res.send({ error });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

console.log("gt");

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found...",
    name: "Onat",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page is not found...",
    name: "Onat",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000...");
});

/*
app.get("", (req, res) => {
  res.send("<h1>Hello express!</h1>");
});


app.get("/help", (req, res) => {
  res.send({
    name: "Onat",
    age: 27,
  });
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});
*/
