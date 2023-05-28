import express from "express";

const router = express.Router();
const {login, signup, addBuild, getExistingCollection} = require('../controllers/auth')

router.get("/", (req, res) => {
    return res.json({
        data: "Hello world"
    })
})
router.post("/login", login);
router.post("/signup", signup);
router.post("/addBuild", addBuild);
router.post("/getExistingCollection", getExistingCollection);

export default router;