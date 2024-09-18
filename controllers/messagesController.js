const db = require('../db/queries');
const { body, validationResult } = require("express-validator");

async function showAllMessages(req, res) {
    const messages = await db.getAllMessages();
    if (req.user) {
        const user = req.user;
        return res.render('messages', { messages: messages, user: user });
    } else {
        res.render('messages', { messages: messages, user: undefined });
    }
}

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
        const newMessage = {
            message_title: messageTitle,
            message_text: messageText,
            timestamp: new Date(),
            user_id: req.user.user_id
        }
        db.addMessage(newMessage);
        res.redirect("/messages");
    }
];

module.exports = {
    showAllMessages,
    newMessageGet,
    newMessagePost,
}