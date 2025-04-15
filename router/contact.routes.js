const { addNewContact, findAllContacts, findByIdContact, updateContact, deleteContact } = require("../controllers/contact.controller")

const router = require("express").Router()

router.post("/", addNewContact)
router.get("/", findAllContacts)
router.get("/:id", findByIdContact)
router.put("/:id", updateContact)
router.delete("/:id", deleteContact)

module.exports = router