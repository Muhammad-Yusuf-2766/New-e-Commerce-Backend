const MemberService = require('../Models/Member')

let restaurantController = module.exports

restaurantController.getSignUpMyRestaurant = async (req, res) => {
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
		res.json({ state: 'success', data: new_member })
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

		res.json({ state: 'success', data: member })
	} catch (error) {
		console.log('ERROR: contr.User-login', error)
		res.json({ state: 'Fail', message: error.message })
	}
}
restaurantController.logout = (req, res) => {
	res.send('You are in Login Page')
}
