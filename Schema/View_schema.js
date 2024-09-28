const mongoose = require('mongoose')
const { like_view_group_enums, board_id_enums } = require('../Lib/config')
const { Schema } = mongoose

const viewSchema = new Schema(
	{
		mb_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		view_ref_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		view_group: {
			type: String,
			required: true,
			enum: {
				values: like_view_group_enums,
			},
		},
		bo_id: {
			type: String,
			required: false,
			enum: {
				values: board_id_enums,
			},
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('View', viewSchema)
