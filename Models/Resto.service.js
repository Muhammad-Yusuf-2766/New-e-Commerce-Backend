const assert = require('assert')
const Definer = require('../Lib/errors')
const Member_schema = require('../Schema/Member_schema')

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
}

module.exports = RestoService
