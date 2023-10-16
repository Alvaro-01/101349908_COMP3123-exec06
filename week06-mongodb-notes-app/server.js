const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notesRoutes = require("./routes/NoteRoutes")
const DB_URL = "mongodb+srv://alvaroaguirremeza:lol@cluster0.aggzi5g.mongodb.net/f2023_comp3123-notes?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/library", notesRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});