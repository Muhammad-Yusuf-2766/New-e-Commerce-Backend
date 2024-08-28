require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

// Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Views
app.set('views', 'views')
app.set('view engine', 'ejs')

// Server & Mongoose starting
const PORT = process.env.PORT || 8080

const Server = async () => {
	try {
		await mongoose
			.connect(process.env.DB_URL)
			.then(() => console.log('MonoDB is Connected'))
		app.listen(PORT, () => {
			console.log(
				`Server is running successfully on: http://localhost:${PORT}/`
			)
		})
	} catch (error) {
		console.log(`Error with Connect to Database: ${error}`)
	}
}

Server()
