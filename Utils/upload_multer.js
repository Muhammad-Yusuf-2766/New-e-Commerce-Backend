const path = require('path')
const multer = require('multer')
const uuid = require('uuid')

/* Multer Image Uploader */
function getTargetImageStorage(address) {
	return multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, `./Uploads/${address}`)
		},
		filename: function (req, file, cb) {
			const extension = path.parse(file.originalname).ext
			const random_name = uuid.v4() + extension
			cb(null, random_name)
		},
	})
}

function makeUploader(address) {
	const storage = getTargetImageStorage(address)
	return multer({ storage: storage })
}

module.exports = makeUploader
