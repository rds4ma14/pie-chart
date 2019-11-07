const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(helmet()); // ocultando header info *security*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());
app.use((req, res, next) => {
    //o ideal seria trocar o "*" por um whitelist de dominios que podem fazer "crossorigin"
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/solr/", (req, res) => {
    const procura = req.query.name;

    /* ... e agora ..*/
    const solr = require("./../src/Solr");
    res.send(`behappy`);
});

app.get("/api/greeting", (req, res) => {
    const name = req.query.name || "World";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(9001, () =>
    console.log("Express server is running on localhost:9001")
);
