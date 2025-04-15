const { addNewChatAdmin, findAllChatAdmins, findByIdChatAdmin, updateChatAdmin, deleteChatAdmin } = require("../controllers/useradmin.controller")

const router = require("express").Router()

router.post("/", addNewChatAdmin)
router.get("/", findAllChatAdmins)
router.get("/:id", findByIdChatAdmin)
router.put("/:id", updateChatAdmin)
router.delete("/:id", deleteChatAdmin)


module.exports = router