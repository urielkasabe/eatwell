const express = require('express');

const router = express.Router()
const uuid = require('uuid');

const resData = require('../util/restaurant-data');


router.get('/restaurants', function (req, res) {
    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', { numOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants });
});

router.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoredRestaurants();

    for (restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', { restaurant: restaurant });
        }
    }

    res.status(404).render('404');

});

router.get('/reccomendations', function (req, res) {
    res.render('recommend');
});

router.post('/reccomendations', function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRes(storedRestaurants);

    res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});

module.exports = router;
