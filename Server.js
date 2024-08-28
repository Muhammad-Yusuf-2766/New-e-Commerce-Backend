require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

// Middlewares
app.use(express.json())
// app.use(fileUpload({}))
app.use(express.static('static'))

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
