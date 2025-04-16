const router = require("express").Router()

const userROUTE = require("./user.routes")
const chatROUTE = require("./chat.routes")
const channelROUTE = require("./channels.routes")
const chatadminROUTE = require("./useradmin.routes")
const contactROUTER = require("./contact.routes")
const userChatROUTER = require("./userchat.routes")
const messageROUTE = require("./message.routes")
const chatpostROUTER = require("./chatpost.routes")
const messagereadROUTE = require("./messageread.routes")
const mediafileROUTE = require("./mediafile.routes")
const messageeditROUTE = require("./messageedit.routes")
const reactionROUTE = require("./reaction.routes")

router.use("/user", userROUTE)
router.use("/chat", chatROUTE)
router.use("/channel", channelROUTE)
router.use("/chat_admin", chatadminROUTE)
router.use("/contact", contactROUTER)
router.use("/user_chat", userChatROUTER)
router.use("/message", messageROUTE)
router.use("/chat_post", chatpostROUTER)
router.use("/message_read", messagereadROUTE)
router.use("/media_file", mediafileROUTE)
router.use("/message_edit", messageeditROUTE)
router.use("/reaction", reactionROUTE)

module.exports = router