let userController = module.exports

userController.home = (req, res) => {
	res.send('You are in Main Page')
}
userController.signUp = (req, res) => {
	res.json(req.body)
}
userController.login = (req, res) => {
	res.send('You are in Login Page')
}
userController.logout = (req, res) => {
	res.send('You are in Login Page')
}
