const pool = require('./pool');

// index queries
// Show counts of users, members, and messages
async function countUsers() {
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    return userCount.rows[0].count;
}

async function countMembers() {
    const memberCount = await pool.query("SELECT COUNT(*) FROM users WHERE member_status = true");
    return memberCount.rows[0].count;
}

async function countMessages() {
    const messageCount = await pool.query("SELECT COUNT(*) FROM messages");
    return messageCount.rows[0].count;
}

// users queries
async function addUser(user) {
    const { first_name, last_name, username, email, password } = user;
    await pool.query(`INSERT INTO users (first_name, last_name, username, email, password) 
        VALUES ($1, $2, $3, $4, $5)`, [first_name, last_name, username, email, password]);
}

// messages queries

module.exports = {
    countUsers,
    countMembers,
    countMessages,
    addUser,
}