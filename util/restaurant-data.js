const fs = require('fs');
const path = require('path');

const FilePath = path.join(__dirname, '..', 'data', 'restaurant.json');

function getStoredRestaurants() {

    const fileData = fs.readFileSync(FilePath);
    const storedRes = JSON.parse(fileData);

    return storedRes;
};

function storeRes(storableRestaurants) {
    fs.writeFileSync(FilePath, JSON.stringify(storableRestaurants));
}

module.exports = {
    getStoredRestaurants,
    storeRes,
}