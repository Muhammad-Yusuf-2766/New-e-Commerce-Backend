const MemberService = require('../Models/Member')

let userController = module.exports

userController.signUp = async (req, res) => {
	try {
		console.log('POST: contr.User-signup')
		const data = req.body
		const memberService = new MemberService()
		const new_member = await memberService.signupData(data)
		res.send(new_member)
	} catch (error) {
		console.log('ERROR: contr.User-signup', error)
		res.json({ state: 'Fail', message: error.message })
	}
}
userController.login = (req, res) => {
	res.send('You are in Login Page')
}
userController.logout = (req, res) => {
	res.send('You are in Login Page')
}
