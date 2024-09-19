class Definer {
	// === General Errors === //
	static general_err1 = 'att: Something went wrong!'
	static general_err2 = 'att: There is no data with that params!'
	static general_err3 = 'att: File-upload error!!'
	static token_err = 'att: There is no any Token Key!!'

	// === Product Errors === //
	static product_err1 = 'att: Product creation is failed!'

	// === Member Auth Errors === //
	static auth_err1 = 'att: Your are inserting already used member nick or phone'
	static auth_err2 = 'att: No member with that Nickname'
	static auth_err3 = 'att: User password is wrong'
}

module.exports = Definer
