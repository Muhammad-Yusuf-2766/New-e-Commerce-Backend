const express = require('express')
const router = express.Router()
const userController = require('./Controllers/userController')

/********************************
 *          REST API            *
 ********************************/

// User routs

router.post('/signup', userController.signUp)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/check-me', userController.checkMyAuth)

// Other routes
router.get('/menu', (req, res) => {
	res.send('Menu Sahifadasiz')
})
router.get('/community', (req, res) => {
	res.send('Jamiyat Sahifadasiz')
})

module.exports = router
