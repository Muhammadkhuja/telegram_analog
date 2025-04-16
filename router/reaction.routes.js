const { createReaction, getAllReactions, getReactionById, updateReaction, deleteReaction } = require("../controllers/reaction.controller")

const router = require("express").Router()

router.post("/", createReaction)
router.get("/", getAllReactions)
router.get("/:id", getReactionById)
router.put("/:id", updateReaction)
router.delete("/:id", deleteReaction)

module.exports = require