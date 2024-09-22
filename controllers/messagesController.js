const db = require('../db/queries');
const { body, validationResult } = require("express-validator");

async function newMessageGet(req, res) {
    res.render('newMessage');
}

const validateMessage = [
    body("messageTitle").trim()
        .isLength({ min: 1, max: 50 }).withMessage("Title can't exceed 50 characters"),
    body("messageText").trim()
        .isLength({ min: 1, max: 240 }).withMessage("Message can't exceed 240 characters")
];

const newMessagePost = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('newMessageError', {
                messageTitle: req.body.messageTitle,
                messageText: req.body.messageText,
                errors: errors.array()
            });
        }
        const { messageTitle, messageText } = req.body;
        const newDate = new Date();
        const dateAdded = newDate.toLocaleDateString();
        const timeAdded = newDate.toLocaleTimeString();
        const messageAdded = dateAdded + ' at ' + timeAdded;
        const newMessage = {
            message_title: messageTitle,
            message_text: messageText,
            timestamp: messageAdded,
            user_id: req.user.user_id
        }
        db.addMessage(newMessage);
        res.redirect("/");
    }
];

async function messageDeleteGet(req, res) {
    res.render('messageDelete', { message_id: req.params.id });
}

async function messageDeletePost(req, res) {
    await db.deleteMessage(req.params.id);
    res.redirect('/');
}

module.exports = {
    newMessageGet,
    newMessagePost,
    messageDeleteGet,
    messageDeletePost
}