const express = require('express')
const router_admin = express.Router()
const restaurntController = require('./Controllers/restaurantController')

/********************************
 *         ADMIN EJS            *
 ********************************/

// User routs

router_admin
	.get('/signup', restaurntController.getMyRestaurant)
	.post('/signup', restaurntController.signUpProcess)

router_admin.get('/login', restaurntController.getLoginMyRestaurant)
router_admin.post('/login', restaurntController.loginProcess)
router_admin.get('/check-self', restaurntController.checkSessions)
router_admin.get('/products/menu', restaurntController.getMyRestaurantData)

module.exports = router_admin
