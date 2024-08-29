const { Error } = require('mongoose')
const MemberModel = require('../Schema/Member_schema')
const Definer = require('../Lib/errors')

class MemberService {
	constructor() {
		this.memberModel = MemberModel
	}
	async signupData(data) {
		try {
			const new_member = new this.memberModel(data)
			let result
			try {
				result = await new_member.save()
			} catch (error) {
				console.log(error)
				throw new Error(Definer.auth_1)
			}
			result.mb_password = ''
			return result
		} catch (error) {
			// return error
			throw error
		}
	}
}

module.exports = MemberService
