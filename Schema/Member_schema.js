const mongoose = require('mongoose')
const {
	mb_status_enums,
	mb_type_enums,
	ordernary_enums,
} = require('../Lib/config')
const { Schema } = mongoose

const memberSchema = new Schema(
	{
		mb_nick: {
			type: String,
			required: true,
			index: { unique: true, sparse: true }, //  bu mb_nick ni unique yagona qilish uchun
		},
		mb_phone: {
			type: String,
			required: true,
			index: { unique: true, sparse: true },
		},
		mb_password: {
			type: String,
			required: true,
			select: false, // bu DB dan mb_data ni chaqirganda password bo'lmasloigi kerak
		},
		mb_type: {
			type: String,
			required: false,
			default: 'USER',
			enum: {
				values: mb_type_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		mb_status: {
			type: String,
			required: false,
			default: 'ACTIVE',
			enum: {
				values: mb_status_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		mb_address: {
			type: String,
			required: false,
		},
		mb_descr: {
			type: String,
			required: false,
		},
		mb_image: {
			type: String,
			require: false,
		},
		mb_point: {
			type: Number,
			required: false,
			default: 0,
		},
		mb_top: {
			type: String,
			required: false,
			default: 'N',
			enum: {
				values: ordernary_enums,
				message: '{VALUE} is not among permitted values',
			},
		},
		mb_views: {
			type: Number,
			required: false,
			default: 0,
		},
		mb_likes: {
			type: Number,
			required: false,
			default: 0,
		},
		mb_follow_cnt: {
			type: Number,
			required: false,
			default: 0,
		},
		mb_subscriber_cnt: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Member', memberSchema)
