const MemberService = require('../Models/Member.service')
const ProductService = require('../Models/Product.service')

let restaurantController = module.exports

restaurantController.home = (req, res) => {
	try {
		console.log('GET: contr.User-Restaurant-Home')
		res.render('Home-page')
	} catch (error) {
		console.log('ERROR: contr.User-Restaurant-Home', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.getMyRestaurantProducts = async (req, res) => {
	try {
		console.log('GET: contr.User-getMyRestaurantProducts')
		const product = new ProductService()
		const data = await product.getAllProductsResto(res.locals.member) // to validate and get Auth member data. we used it in Server.js but it is another way. So you can use this way too if you want
		res.render('restaurant-menu', { restaurant_data: data })
	} catch (error) {
		console.log('ERROR: contr.User-getMyRestaurantProducts', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.getSignupMyRestaurant = async (req, res) => {
	try {
		console.log('GET: contr.getSignUpMyRestaurant')
		res.render('signup')
	} catch (error) {
		console.log('ERROR: contr.getSignUpMyRestaurant', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.signUpProcess = async (req, res) => {
	try {
		console.log('POST: contr.User-signup')
		const data = req.body,
			memberService = new MemberService(),
			new_member = await memberService.signupData(data)
		// for user session
		req.session.member = new_member
		res.redirect('/resto/products/menu')
	} catch (error) {
		console.log('ERROR: contr.User-signup', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.getLoginMyRestaurant = async (req, res) => {
	try {
		console.log('GET: contr.getLoginMyRestaurant')
		res.render('login')
	} catch (error) {
		console.log('ERROR: contr.getLoginMyRestaurant', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.loginProcess = async (req, res) => {
	try {
		console.log('POST: contr.User-login')
		const data = req.body,
			memberService = new MemberService(),
			member = await memberService.loginData(data)
		// for user Session
		req.session.member = member
		req.session.save(function () {
			res.redirect('/resto/products/menu')
		})
	} catch (error) {
		console.log('ERROR: contr.User-login', error)
		res.json({ state: 'Fail', message: error.message })
	}
}
restaurantController.logout = (req, res) => {
	res.send('You are in Login Page')
}

restaurantController.validateAuthRestaurant = (req, res, next) => {
	if (req.session?.member?.mb_type === 'RESTAURANT') {
		req.member = req.session.member
		next()
	} else
		res.json({
			state: 'Fail',
			message: 'Only Authenticated members with restaurant type',
		})
}

restaurantController.checkSessions = (req, res) => {
	console.log('POST: contr.User-check-self')
	if (req.session?.member) {
		res.json({ state: 'success', data: req.session.member })
	} else {
		res.json({ state: 'Fail', message: 'You are not authenticated' })
	}
}
