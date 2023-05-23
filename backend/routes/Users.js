const express = require("express");
const router = express.Router();
const { getUser, updateUser, deleteUser, createUser} = require("../controllers/user");
const { verifyToken, verifyUser , verifyAdmin}= require("../utils/verifyToken")
// Routes Only has endpoints


router.get("/checkauthentication", verifyToken, (req, res)=> {
    res.send("you are logged in")
});

router.get("/checkuser/:id", verifyUser, (req, res)=> {
    res.send("you are logged in and can delete ur account")
});

router.get("/checkadmin/:id", verifyAdmin, (req, res)=> {
    res.send("hello admin, you are logged in and can delete any account")
});

// add verification middleware

router.get("/create", createUser)

router.get("/", verifyAdmin ,getUser)

router.put("/update/:id", verifyAdmin,  updateUser)

router.delete("delete/:id", verifyAdmin,deleteUser)



module.exports = router;







