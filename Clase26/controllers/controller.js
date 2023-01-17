// Index
const getIndex = (req, res) => res.render('form.hbs')

// Login
const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let { username } = req.user;
		res.render('form.hbs', { username });
	} else res.render('login.hbs');
};

// Signup
const getSignup = (req, res) => res.render('signup.hbs');

// Process login
const postLogin = (req, res) => {
	const { username } = req.user;
	res.render('form.hbs', { username });
}

// Process signup
const postSignup = (req, res) => {
	const { username } = req.user;
	res.render('form.hbs', { username });
}

const getFailLogin = (req, res) => res.render('faillogin.hbs');
const getFailSignup = (req, res) => res.render('failsignup.hbs');

// Logout
const getLogout = (req, res) => {
	req.logout(error => { if (error) next(error) });
	res.redirect('/login');
}

const failRoute = (req, res) => res.status(404).render('routing-error');

module.exports = { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute };