const { addNewUser, findAllUsers, loginuser, updateUser, findByIdUser, logoutuser, refreshTokenuser, deleteUser } = require("../controllers/user.controller")

const router = require("express").Router()

router.post("/login", loginuser)
router.post("/logout", logoutuser)
router.post("/refresh", refreshTokenuser)

router.post("/", addNewUser)
router.get("/", findAllUsers)
router.get("/:id", findByIdUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


module.exports = router