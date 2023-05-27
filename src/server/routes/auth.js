import express from "express";

const router = express.Router();
const {login, signup} = require('../controllers/auth')

router.get("/", (req, res) => {
    return res.json({
        data: "Hello world"
    })
})
router.post("/login", login);
router.post("/signup", signup);

export default router;