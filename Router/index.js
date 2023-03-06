const express = require('express');
const router = express.Router();
const Hotelcontroller = require('../Controllers/hotels');
const userController = require('../Controllers/user');

router.get('/Hotels', Hotelcontroller.hotels);
router.post('/book/:hotelId', Hotelcontroller.bookHotel);
router.post('/login',userController.getUserByLogin);
router.post('/loginhistory',userController.getHistory);

module.exports = router;