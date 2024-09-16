const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");

async function newUserGet(req, res) {
    await res.render('newUserForm');
}

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage("First Name must contain only letters.")
        .isLength({ min: 1, max: 50 }).withMessage("First Name must be between 1 and 50 characters."),
    body("lastName").trim()
        .isAlpha().withMessage("Last Name must contain only letters.")
        .isLength({ min: 1, max: 50 }).withMessage("Last Name must be between 1 and 50 characters."),
    body("username").trim()
        .isLength({ min: 1, max: 50 }).withMessage("Username must be between 1 and 50 characters."),
    body("email").trim()
        .isEmail().withMessage("Email must be formatted as abc@xyz.com"),
    body("password").trim()
        .isLength({ min: 5 }).withMessage("Password must contain at least 5 characters."),
    body("passwordConfirm").trim()
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage("Passwords don't match!"),
];

const newUserPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('newUserError', {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                errors: errors.array()
            });
        }
        const { firstName, lastName, username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: hashedPassword
        }
        db.addUser(newUser);
        res.redirect("/login");
    }
];

module.exports = {
    newUserGet,
    newUserPost,
}