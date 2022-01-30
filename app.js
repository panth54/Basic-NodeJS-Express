const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const productRouter = express.Router();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,"/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

productRouter.route("/").get((req, res) => {
    res.render("products", {
        products: [
            {name: "กะเพราหมู", description: "หมูสีรุ้ง", price: 100},
            {name: "กะเพราแมว", description: "แมวสีรุ้ง", price: 200},
            {name: "กะเพราหมา", description: "หมาสีรุ้ง", price: 300},
            {name: "กะเพราม้า", description: "ม้าสีรุ้ง", price: 400}
        ]
    });
});

productRouter.route("/1").get((req, res) => {
    res.send('Hello product1 !!!!');
});
app.use("/products", productRouter);

app.get('/', (req, res) => {

    // res.send('Hello World 123 to da mars');
    res.render('index', {username: "Peter", customers: ["Alice", "Bownie", "Colnie", "Dang"]});
    
});

app.listen(PORT, () => {
    debug("Listening on port"+ chalk.green(" : " + PORT));
});