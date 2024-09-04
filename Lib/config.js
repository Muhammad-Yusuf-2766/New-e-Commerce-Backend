const { default: mongoose } = require('mongoose')

exports.mb_type_enums = ['USER', 'ADMIN', 'PEDAL', 'RESTAURANT']
exports.mb_status_enums = ['ONPAUSE', 'ACTIVE', 'DELETED']
exports.ordernary_enums = ['N', 'Y']

exports.product_collection_enums = ['dish', 'salad', 'dessert', 'drink', 'etc']
exports.product_status_enums = ['PAUSED', 'PROCESS', 'DELETED']
exports.product_size_enums = ['small', 'normal', 'large', 'set']
exports.product_volume_enums = [0.5, 1, 1.2, 1.5, 2]

/*************************************
 *      MONOGDB RELATED COMMANDS
 *************************************/

exports.shapeIntoMongooseObjectId = id => {
	if (typeof id === 'string') {
		return new mongoose.Types.ObjectId(id)
	} else return id
}
