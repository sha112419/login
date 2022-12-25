const usercontroller = require("../controller/usercontroller")
const upload = require("../util/upload")

const router = require ("express").Router()

router.post("/addUser",usercontroller.addUser)
router.get("/allUser",usercontroller.getallUser)
router.get("/oneUser",usercontroller.getoneUser)
router.put("/updateUser",usercontroller.updateUser)
router.delete("/deleteUser",usercontroller.deleteUser)
router.post("/addprofile",upload.single('Profile'),usercontroller.uploadimage)
router.get("/loginUser",usercontroller.loginUser)


module.exports = router;