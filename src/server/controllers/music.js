import Users from "../models/user";
require("dotenv").config();

export const getBackgroundMusic = async (req, res) => {
    try {
        const {username} = req.body;
        const result = await Users.findOne({username:username});
        return res.json({
            data: result.backgroundMusic
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }    
}

export const setBackgroundMusic = async (req, res) => {
    try {
        const {username, isPlaying} = req.body;
        const result = await Users.updateOne({username:username}, {backgroundMusic:isPlaying});
        return res.json({
            data: "Background music status update successful."
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }        
}