const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const products = require("./data/products.json");
const productRouter = express.Router();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,"/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

productRouter.route("/").get((req, res) => {
    res.render("products", {
        products,
    });
});

productRouter.route("/:id").get((req, res) => {
    const id = req.params.id;
    res.render("product", {
        product: products[id],
    })
});

app.use("/products", productRouter);

app.get('/', (req, res) => {

    // res.send('Hello World 123 to da mars');
    res.render('index', {username: "Peter", customers: ["Alice", "Bownie", "Colnie", "Dang"]});
    
});

app.listen(PORT, () => {
    debug("Listening on port"+ chalk.green(" : " + PORT));
});