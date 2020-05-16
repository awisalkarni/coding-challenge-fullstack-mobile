// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Coding challenge API'
    });
});

// Import contact controller
var vehicleController = require('./controllers/vehicleController');
var bookingController = require('./controllers/bookingController');

router.route('/vehicles').get(vehicleController.index);
router.route('/booking/init').post(bookingController.init);
router.route('/booking/centres').get(bookingController.centres);
router.route('/booking/slots').get(bookingController.slots);

module.exports = router;
