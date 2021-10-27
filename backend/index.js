/**
 * Declaring
 */
const express = require('express');
const path = require('path');
const fs = require("fs")
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const multer = require('multer');

require("dotenv").config();


/**
 * Intialization
 */
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const router = require("./routes/api");
const apiResponse = require("./utils/apiResponse");

/**
 * Middlewares
 */
app.use(morgan("short", { stream: accessLogStream }));
app.use(morgan("dev"));
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(cors());

/**
 * Routes
 */
app.use("/api", router);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Toonified server is up!! '})
})
/**
 * throw 404 if URL not found
 * */
app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
    if (err.name == "UnauthorizedError") {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
});

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running at ${process.env.PORT}`)
});

module.exports = app;