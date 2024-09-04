const mongoose = require('mongoose')
const {
	product_collection_enums,
	product_status_enums,
	product_size_enums,
	product_volume_enums,
} = require('../Lib/config')
const { Schema } = mongoose

const productSchema = new Schema(
	{
		product_name: {
			type: String,
			required: true,
		},
		product_collection: {
			type: String,
			required: true,
			enum: {
				values: product_collection_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		product_status: {
			type: String,
			required: false,
			default: 'PAUSED',
			enum: {
				values: product_status_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		product_price: {
			type: Number,
			required: true,
		},
		product_discount: {
			type: Number,
			required: false,
			default: 0,
		},
		product_left_cnt: {
			type: Number,
			required: true,
		},
		product_size: {
			type: String,
			default: 'normal', // Condition
			required: function () {
				const sized_list = ['dish', 'salad', 'dessert']
				return sized_list.includes(this.product_collection)
			},
			enum: {
				values: product_size_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		product_volume: {
			type: Number,
			default: 1, // Condition
			required: function () {
				return this.product_collection === 'drink'
			},
			enum: {
				values: product_volume_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		product_descr: {
			type: String,
			required: true,
		},
		product_images: {
			type: Array,
			required: false,
			default: [],
		},
		product_likes: {
			type: Number,
			required: false,
			default: 0,
		},
		product_views: {
			type: Number,
			required: false,
			default: 0,
		},
		restaurant_id: {
			type: Schema.ObjectId,
			ref: 'Member',
			required: false,
		},
	},
	{ timestamps: true }
)
// ===  It is for making unique Products with values in one restaurant
productSchema.index(
	{ restaurant_id: 1, product_name: 1, product_size: 1, product_volume: 1 },
	{ unique: true }
)

module.exports = mongoose.model('Product', productSchema)
