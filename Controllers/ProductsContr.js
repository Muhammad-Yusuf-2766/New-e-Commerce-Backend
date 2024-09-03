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
		res.send(user)
	} catch (error) {
		console.log('ERROR: contr.Product-addNewProduc', error)
	}
}

productController.updateChosenProduct = async (req, res) => {
	try {
		console.log('POST: contr.Product-updateChosenProduct')
	} catch (error) {
		console.log('ERROR: contr.Product-updateChosenProduct', error)
	}
}
