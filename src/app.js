const express = require('express');
require("./db/conn");
const User = require("./models/usermessage");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 4000;

// Middleware for static files
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this for JSON parsing if needed

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

// Define a route
app.get('/', (req, res) => {
    res.render("index");
});

app.post("/contact", async (req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error); // Corrected error handling
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});

