const router = require("express").Router()

const userROUTE = require("./user.routes")
const chatROUTE = require("./chat.routes")
const channelROUTE = require("./channels.routes")
const chatadminROUTE = require("./useradmin.routes")
const contactROUTER = require("./contact.routes")
const userChatROUTER = require("./userchat.routes")

router.use("/user", userROUTE)
router.use("/chat", chatROUTE)
router.use("/channel", channelROUTE)
router.use("/chat_admin", chatadminROUTE)
router.use("/contact", contactROUTER)
router.use("/user_chat", userChatROUTER)

module.exports = router