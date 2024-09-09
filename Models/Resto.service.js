const assert = require('assert')
const Definer = require('../Lib/errors')
const Member_schema = require('../Schema/Member_schema')
const { shapeIntoMongooseObjectId } = require('../Lib/config')

class RestoService {
	constructor() {
		this.memberModel = Member_schema
	}

	async getAllRestoData() {
		try {
			const result = await this.memberModel
				.find({
					mb_type: 'RESTAURANT',
				})
				.exec()

			assert(result, Definer.general_err1)
			return result
		} catch (error) {
			throw error
		}
	}

	async updateRestoByAdminData(update_data) {
		try {
			const id = shapeIntoMongooseObjectId(update_data?.id)
			const result = await this.memberModel
				.findByIdAndUpdate({ _id: id }, update_data, {
					runValidators: true,
					lean: true,
					returnDocument: 'after',
				})
				.exec()

			assert.ok(result, Definer.general_err1)
			return result
		} catch (error) {
			throw error
		}
	}
}

module.exports = RestoService
