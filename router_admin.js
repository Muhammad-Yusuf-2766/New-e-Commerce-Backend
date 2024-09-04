const express = require('express')
const router_admin = express.Router()
const restaurntController = require('./Controllers/restaurantController')
const productController = require('./Controllers/ProductsContr')
const uploader_product = require('./Utils/upload_multer')('Products')

/********************************
 *         ADMIN EJS            *
 ********************************/

// User routs

router_admin
	.get('/signup', restaurntController.getSignupMyRestaurant)
	.post('/signup', restaurntController.signUpProcess)

router_admin.get('/login', restaurntController.getLoginMyRestaurant)
router_admin.post('/login', restaurntController.loginProcess)
router_admin.get('/check-self', restaurntController.checkSessions)

// Products related APIs
router_admin.get('/products/menu', restaurntController.getMyRestaurantProducts)
router_admin.post(
	'/products/create',
	restaurntController.validateAuthRestaurant,
	uploader_product.array('product_images', 5),
	productController.addNewProduct
)
router_admin.post(
	'/products/edit/:id',
	restaurntController.validateAuthRestaurant,
	productController.updateChosenProduct
)

module.exports = router_admin
