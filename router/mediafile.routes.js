const { createMediaFile, findAllMediaFiles, findMediaFileById, updateMediaFile, deleteMediaFile } = require("../controllers/mediafiles.controller")

const router = require("express").Router()

router.post("/", createMediaFile)
router.get("/", findAllMediaFiles)
router.get("/:id", findMediaFileById)
router.put("/:id", updateMediaFile)
router.delete("/:id", deleteMediaFile)

module.exports = router