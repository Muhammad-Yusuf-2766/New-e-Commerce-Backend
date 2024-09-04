const assert = require('assert')
const { shapeIntoMongooseObjectId } = require('../Lib/config')
const ProductModel = require('../Schema/Product_schema')
const Definer = require('../Lib/errors')

class ProductService {
	constructor() {
		this.productModel = ProductModel
	}

	async addNewProductData(data, member) {
		try {
			data.restaurant_mb_id = shapeIntoMongooseObjectId(member._id)
			const new_product = new this.productModel(data)
			const result = await new_product.save()
			assert.ok(result, Definer.product_err1)
			return result
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = ProductService
