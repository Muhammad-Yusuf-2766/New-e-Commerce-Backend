const MemberService = require('../Models/Member')

let userController = module.exports

userController.signUp = async (req, res) => {
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

userController.login = async (req, res) => {
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
userController.logout = (req, res) => {
	res.send('You are in Login Page')
}
