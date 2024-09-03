const express = require('express')
const router_admin = express.Router()
const restaurntController = require('./Controllers/restaurantController')
const productController = require('./Controllers/ProductsContr')
const { uploadProductImg } = require('./Utils/upload_multer')

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
router_admin.get('/products/menu', restaurntController.getMyRestaurantData)
router_admin.post(
	'/products/create',
	restaurntController.validateAuthRestaurant,
	uploadProductImg.single('product_image'),
	productController.addNewProduct
)
router_admin.post('/products/edit/:id', productController.updateChosenProduct)

module.exports = router_admin
