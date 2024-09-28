const { Error } = require('mongoose')
const MemberModel = require('../Schema/Member_schema')
const Definer = require('../Lib/errors')
const assert = require('assert')
const bcrypt = require('bcryptjs')
const { shapeIntoMongooseObjectId } = require('../Lib/config')
const ViewService = require('./View.service')

class MemberService {
	constructor() {
		this.memberModel = MemberModel
	}
	async signupData(data) {
		try {
			const salt = await bcrypt.genSalt()
			data.mb_password = await bcrypt.hash(data.mb_password, salt)

			const new_member = new this.memberModel(data)
			let result
			try {
				result = await new_member.save()
			} catch (error) {
				console.log(error)
				throw new Error(Definer.auth_err1)
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
				.findOne({ mb_nick: data.mb_nick }, { mb_nick: 1, mb_password: 1 }) // bu shu ikkala ma'lumotnigina db dan chaqirish uchun
				.exec()
			assert.ok(member, `${Definer.auth_err2}:${data.mb_nick}`)

			const isMatch = await bcrypt.compare(data.mb_password, member.mb_password)
			assert.ok(isMatch, Definer.auth_err3)
			return await this.memberModel.findOne({ mb_nick: data.mb_nick }).exec()
		} catch (error) {
			throw error
		}
	}

	async getChosenMemberData(member, id) {
		try {
			id = shapeIntoMongooseObjectId(id)

			if (member) {
				// condition if not seen before
				this.viewChosenItemByMember(member, id, 'member')
			}
			const result = await this.memberModel
				.aggregate([
					{ $match: { _id: id, mb_status: 'ACTIVE' } },
					{ $unset: 'mb_password' },
				]) //agregate barcha ma'lumotlarni olib beradi. mb_password ni ham olib beradi. Shuning uchun << unset >> dan foydalanamiz.
				.exec()

			assert.ok(result, Definer.general_err2)
			return result[0]
		} catch (error) {
			throw error
		}
	}

	async viewChosenItemByMember(member, view_ref_id, group_type) {
		try {
			view_ref_id = shapeIntoMongooseObjectId(view_ref_id)
			const mb_id = shapeIntoMongooseObjectId(member._id)

			// Validation needed
			const viewService = new ViewService(mb_id)
			const isValid = await viewService.validateChosenTarget(
				view_ref_id,
				group_type
			)
			assert.ok(isValid, Definer.general_err2)

			// if User has seen target <before></before>
			const isExist = await viewService.checkViewExistence(view_ref_id)
			console.log('have User seen this target before ?:', isExist)

			if (!isExist) {
				const result = await viewService.insertMemberView(
					view_ref_id,
					group_type
				)
				assert.ok(result, Definer.general_err2)
			}
			return true
		} catch (error) {
			throw error
		}
	}
}

module.exports = MemberService
