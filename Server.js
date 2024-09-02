require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const router = require('./router')
const router_admin = require('./router_admin')
let session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({
	uri: process.env.DB_URL,
	collection: 'sessions',
})

// Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: {
			maxAge: 1000 * 60 * 30,
		},
		store: store,
		resave: true,
		saveUninitialized: true,
	})
)
app.use(function (req, res, next) {
	res.locals.member = req.session.member
	next()
})

// Views
app.set('views', 'views')
app.set('view engine', 'ejs')

// Routing
app.use('/', router)
app.use('/resto', router_admin)
// app.use('/resto', router_resto)

// ======== Server & Mongoose starting ======== //

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
