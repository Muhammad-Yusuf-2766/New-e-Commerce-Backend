const assert = require('assert')
const MemberService = require('../Models/Member.service')
const jwt = require('jsonwebtoken')
const Definer = require('../Lib/errors')

let userController = module.exports

userController.signUp = async (req, res) => {
	try {
		console.log('POST: contr.User-signup')
		const data = req.body,
			memberService = new MemberService(),
			new_member = await memberService.signupData(data)

		// JWT related logic
		const token = userController.createToken(new_member)
		res.cookie('access_token', token, {
			maxAge: 5 * 24 * 3600 * 1000,
			httpOnly: true,
		})

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

		// JWT related logic
		const token = userController.createToken(member)
		res.cookie('access_token', token, {
			maxAge: 5 * 24 * 3600 * 1000,
			httpOnly: true,
		})

		res.json({ state: 'success', jwt: token, data: member })
	} catch (error) {
		console.log('ERROR: contr.User-login', error)
		res.json({ state: 'Fail', message: error.message })
	}
}
userController.logout = (req, res) => {
	res.send('You are in Login Page')
}

userController.createToken = member => {
	try {
		const upload_data = {
			_id: member._id,
			mb_nick: member.mb_nick,
			mb_type: member.mb_type,
		}

		const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
			expiresIn: '5d',
		})

		assert.ok(token, Definer.token_err)
		return token
	} catch (error) {
		throw error
	}
}

userController.checkMyAuth = (req, res) => {
	try {
		console.log('GET: cont/Check-my-auth')
		const token = req.cookies['access_token']

		const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null

		res.json({ state: 'success', jwt: token, memebr: member })
	} catch (error) {
		throw error
	}
}
