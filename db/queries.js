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

async function memberSub(id) {
    await pool.query("UPDATE users SET member_status = true WHERE user_id = $1", [id]);
}

async function memberUnsub(id) {
    await pool.query("UPDATE users SET member_status = false WHERE user_id = $1", [id]);
}

async function adminSub(id) {
    await pool.query("UPDATE users SET admin_status = true WHERE user_id = $1", [id]);
}

async function adminUnsub(id) {
    await pool.query("UPDATE users SET admin_status = false WHERE user_id = $1", [id]);
}

// messages queries
async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages JOIN users ON messages.user_id = users.user_id ORDER BY message_id DESC");
    return rows;
}

async function addMessage(message) {
    const { message_title, message_text, timestamp, user_id } = message;
    await pool.query(`INSERT INTO messages (message_title, message_text, timestamp, user_id)
        VALUES ($1, $2, $3, $4)`, [message_title, message_text, timestamp, user_id]);
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE message_id = $1", [id]);
}

module.exports = {
    countUsers,
    countMembers,
    countMessages,
    addUser,
    memberSub,
    memberUnsub,
    adminSub,
    adminUnsub,
    getAllMessages,
    addMessage,
    deleteMessage
}