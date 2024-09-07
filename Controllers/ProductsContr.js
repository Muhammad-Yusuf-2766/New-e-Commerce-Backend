const assert = require('assert')
const Definer = require('../Lib/errors')
const ProductService = require('../Models/Product.service')

let productController = module.exports

productController.getAllProducts = async (req, res) => {
	try {
		console.log('GET: contr.Product-getMyProducts')
	} catch (error) {
		console.log('ERROR: contr.Product-getMyProducts', error)
		res.json({ state: 'Fail', message: error.message })
	}
}

productController.addNewProduct = async (req, res) => {
	try {
		console.log('POST: contr.Product-addNewProduct')
		// TO_DO: Product creation develop
		assert(req.files, Definer.general_err3)
		const product = new ProductService()
		const data = req.body

		data.product_images = req.files.map(file => {
			return file.path
		})
		const result = await product.addNewProductData(data, req.member)
		const html = `<script>
										alert("New dish is added successfully!")
										window.location.replace('/resto/products/menu')
									</script>`

		res.end(html)
	} catch (error) {
		console.log('ERROR: contr.Product-addNewProduct', error)
		res.send(error.message)
	}
}

productController.updateChosenProduct = async (req, res) => {
	try {
		console.log('POST: contr.Product-updateChosenProduct')
		const product = new ProductService()
		const id = req.params.id
		const result = await product.editProductData(id, req.body, req.member._id)
		res.json({ state: 'Success', data: result })
	} catch (error) {
		console.log('ERROR: contr.Product-updateChosenProduct', error)
		res.json({ state: 'Fail', error: error })
	}
}
