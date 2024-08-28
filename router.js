const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('Bosh Sahifadasiz')
})
router.get('/menu', (req, res) => {
	res.send('Menu Sahifadasiz')
})
router.get('/community', (req, res) => {
	res.send('Jamiyat Sahifadasiz')
})

module.exports = router
