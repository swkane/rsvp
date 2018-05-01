const express = require('express');
const mongoose = require('mongoose');

const app = express();

// takes form data and converts to json
app.use(express.urlencoded( { extended: false } ) );

app.set('view engine', 'pug');
app.set('views', './views');

app.listen(3000, () => console.log('heeeyyoooooo we run this server'));

// Model
let responseSchema = mongoose.Schema({
    name: String,
    email: String,
    attending: Boolean,
    guests: Number
});

// Instance
let Response = mongoose.model('Response', responseSchema);

// mongoose connection / setup
mongoose.connect('mongodb://localhost/rsvp');
let db = mongoose.connection;

// Home Page
app.get('/', (req, res) => {
    console.log('home page');
    res.render('index');
});

// Post an RSVP
app.post('/reply', (req, res) => {
    console.log(req.body);
    Response.create( req.body , function(err, response) {
        console.log(`Saved response from ${response.name}`);
    } );
    res.render('reply');
});

// Show Guest List
app.get('/guests', (req, res) => {
    let coming = [];
    let notComing = [];
    Response.find(function(err, responses) {
        console.log(responses);
        responses.map( response => {
            response.attending ? coming.push(response.name) : notComing.push(response.name);
        });
        res.render('guests', { coming, notComing });
    });
});