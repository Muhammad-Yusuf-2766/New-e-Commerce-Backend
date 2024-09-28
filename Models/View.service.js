const ViewSchema = require('../Schema/View_schema')
const MemberSchema = require('../Schema/Member_schema')

class ViewService {
	constructor(mb_id) {
		this.viewModel = ViewSchema
		this.memberSchema = MemberSchema
		this.mb_id = mb_id
	}

	async validateChosenTarget(view_ref_id, group_type) {
		try {
			let result
			switch (group_type) {
				case 'member':
					result = await this.memberSchema
						.findById({ _id: view_ref_id, mb_status: 'ACTIVE' })
						.exec()
					break
			}
			return !!result // Bu resultni qiymati bor bo'lsa true bo'lmasa false qayataradi.
		} catch (error) {
			throw error
		}
	}

	async insertMemberView(view_ref_id, group_type) {
		try {
			const new_view = new this.viewModel({
				mb_id: this.mb_id,
				view_ref_id: view_ref_id,
				view_group: group_type,
			})
			const result = await new_view.save()
			// Increase view number +1
			await this.modifyItemViewCounts(view_ref_id, group_type)

			return result
		} catch (error) {
			throw error
		}
	}

	async modifyItemViewCounts(view_ref_id, group_type) {
		try {
			switch (group_type) {
				case 'member':
					await this.memberSchema
						.findByIdAndUpdate(
							{ _id: view_ref_id },
							{ $inc: { mb_views: 1 } },
							{ new: true }
						)
						.exec()
					break
			}
			return true
		} catch (error) {
			throw error
		}
	}

	async checkViewExistence(view_ref_id) {
		try {
			const view = await this.viewModel
				.findOne({ mb_id: this.mb_id, view_ref_id: view_ref_id })
				.exec()
			return view ? true : false
		} catch (error) {
			throw error
		}
	}
}

module.exports = ViewService
