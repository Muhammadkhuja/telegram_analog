const router = require("express").Router()

const userROUTE = require("./user.routes")

router.use("/user", userROUTE)

module.exports = router