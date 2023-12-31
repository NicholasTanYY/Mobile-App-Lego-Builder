import express from "express";

const router = express.Router();
const {login, signup, deleteAccount, changeUsernameOrPassword} = require('../controllers/account');
const {getBackgroundMusic, setBackgroundMusic} = require('../controllers/music');
const {addBuild, getExistingCollection, removeBuild} = require('../controllers/builds');
const {updateBuildPage} =require('../controllers/pdfPage');

router.get("/", (req, res) => {
    return res.json({
        data: "Hello world"
    })
})

router.post("/login", login);
router.post("/signup", signup);
router.post("/deleteAccount", deleteAccount);
router.post("/changeUsernameOrPassword", changeUsernameOrPassword);

router.post("/getBackgroundMusic", getBackgroundMusic);
router.post("/setBackgroundMusic", setBackgroundMusic);

router.post("/addBuild", addBuild);
router.post("/getExistingCollection", getExistingCollection);
router.post("/removeBuild", removeBuild);

router.post("/updateBuildPage", updateBuildPage);

export default router;