const assert = require('assert')
const MemberService = require('../Models/Member.service')
const ProductService = require('../Models/Product.service')
const Definer = require('../Lib/errors')

let restaurantController = module.exports

restaurantController.home = (req, res) => {
	try {
		console.log('GET: contr.Resto-Restaurant-Home')
		res.render('Home-page')
	} catch (error) {
		console.log('ERROR: contr.Resto-Restaurant-Home', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.getMyRestaurantProducts = async (req, res) => {
	try {
		console.log('GET: contr.Resto-getMyRestaurantProducts')
		const product = new ProductService()
		const data = await product.getAllProductsResto(res.locals.member) // to validate and get Auth member data. we used it in Server.js but it is another way. So you can use this way too if you want
		res.render('restaurant-menu', { restaurant_data: data })
	} catch (error) {
		console.log('ERROR: contr.Resto-getMyRestaurantProducts', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.getSignupMyRestaurant = async (req, res) => {
	try {
		console.log('GET: contr.Resto-getSignUpMyRestaurant')
		res.render('signup')
	} catch (error) {
		console.log('ERROR: contr.Resto-getSignUpMyRestaurant', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

restaurantController.signUpProcess = async (req, res) => {
	try {
		console.log('POST: contr.Resto-signupProcess')
		assert(req.file, Definer.general_err3)

		let new_member = req.body
		new_member.mb_type = 'RESTAURANT'
		new_member.mb_image = req.file.path

		const memberService = new MemberService()
		const result = await memberService.signupData(new_member)
		assert(result, Definer.general_err1)
		// for user session
		req.session.member = result
		res.redirect('/resto/products/menu')
	} catch (error) {
		console.log('ERROR: contr.Resto-signupProcess', error)
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
		console.log('POST: contr.User-loginProcess')
		const data = req.body,
			memberService = new MemberService(),
			member = await memberService.loginData(data)
		// for user Session
		req.session.member = member
		req.session.save(function () {
			member.mb_type === 'ADMIN'
				? res.redirect('/resto/all-restaurant')
				: res.redirect('/resto/products/menu')
		})
	} catch (error) {
		console.log('ERROR: contr.User-loginProcess', error)
		res.json({ state: 'Fail', message: error.message })
	}
}
restaurantController.logout = (req, res) => {
	try {
		console.log('POST: contr.Resto-logout')
		req.session.destroy(function () {
			res.redirect('/resto')
		})
	} catch (error) {
		console.log('ERROR: contr.Resto-signupProcess', error)
		res.json({ state: 'Fail', message: error.message })
	}
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
