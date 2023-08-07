const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/restaurants', function (req, res) {
    const FilePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(FilePath);
    const storedRes = JSON.parse(fileData);

    res.render('restaurants', { numOfRestaurants: storedRes.length, restaurants: storedRes });
});

app.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
    res.render('restaurant-detail', {rid: restaurantId});
});

app.get('/reccomendations', function (req, res) {
    res.render('recommend');
});

app.post('/reccomendations', function (req, res) {
    const restaurant = req.body;
    const FilePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(FilePath);
    const storedRes = JSON.parse(fileData);

    storedRes.push(restaurant);

    fs.writeFileSync(FilePath, JSON.stringify(storedRes));

    res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
    res.render('confirm');
});

app.get('/about', function (req, res) {
    res.render('about');
});


app.listen(3000);