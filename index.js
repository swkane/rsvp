const express = require('express');
const mongoose = require('mongoose');
const Response = require('./models/response');

const app = express();

// takes form data and converts to json
app.use(express.urlencoded( { extended: false } ) );

// set the views directory
app.set('view engine', 'pug');
app.set('views', './views');

const dbName = "rsvp";
const DB_USER = "admin";
const DB_PASSWORD = "admin";
const DB_URI = "ds111430.mlab.com:11430";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // mongoose connection / setup
    mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URI}/${dbName}`);
    console.log('heeeyyoooooo we run this server')
});

// mongoose.connection refers to the db
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