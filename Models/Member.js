const { Error } = require('mongoose')
const MemberModel = require('../Schema/Member_schema')
const Definer = require('../Lib/errors')
const assert = require('assert')

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

	async loginData(data) {
		try {
			const member = await this.memberModel
				.findOne({ mb_nick: data.mb_nick }, { mb_nick: 1, mb_password: 1 })
				.exec()
			assert.ok(member, `${Definer.auth_2}:${data.mb_nick}`)

			const isMatch = data.mb_password === member.mb_password
			assert.ok(isMatch, Definer.auth_3)
			return await this.memberModel.findOne({ mb_nick: data.mb_nick }).exec()
		} catch (error) {
			throw error
		}
	}
}

module.exports = MemberService
