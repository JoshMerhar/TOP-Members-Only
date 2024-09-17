const db = require('../db/queries');

async function getAllCounts(req, res) {
    const userCount = await db.countUsers();
    const memberCount = await db.countMembers();
    const messageCount = await db.countMessages();
    res.render('index', { userCount: userCount, memberCount: memberCount, messageCount: messageCount, user: null });
}

async function getLogin(req, res) {
    res.render('login');
}

module.exports = {
    getAllCounts,
    getLogin,
}