const db = require('../db/queries');

async function getAllCounts(req, res) {
    const userCount = await db.countUsers();
    const memberCount = await db.countMembers();
    const messageCount = await db.countMessages();
    const messages = await db.getAllMessages();
    if (req.user) {
        return res.render('index', { userCount: userCount, memberCount: memberCount, messageCount: messageCount, messages: messages, user: req.user });
    } else {
        res.render('index', { userCount: userCount, memberCount: memberCount, messageCount: messageCount, messages: messages, user: null });
    }
}

async function getLogin(req, res) {
    if (req.user) {
        return res.redirect('/users/user-portal');
    }
    // Retrieve error messages from session
    const errorMessage = req.session.messages || [];
    if (errorMessage.message) {
        const error = { msg: errorMessage.message };
        console.log(error);
        req.session.messages = []; // Clear error messages after rendering
        return res.render('login', { errors: [error] });
    } else {
        res.render('login');
    }
}

module.exports = {
    getAllCounts,
    getLogin,
}