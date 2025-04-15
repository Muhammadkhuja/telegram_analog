const { addNewChannel, findAllChannels, findByIdChannel, updateChannel, deleteChannel } = require("../controllers/channels.controller")

const router = require("express").Router()

router.post("/", addNewChannel)
router.get("/", findAllChannels)
router.get("/:id", findByIdChannel)
router.put("/:id", updateChannel)
router.delete("/:id", deleteChannel)


module.exports = router