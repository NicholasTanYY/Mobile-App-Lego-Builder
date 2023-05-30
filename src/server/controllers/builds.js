import Users from "../models/user";
require("dotenv").config();

export const addBuild = async (req, res) => {
    try {
        const { username, selectedLegoSet } = req.body;
        const checkCollection = await Users.findOne({username:username}, "collections");
        for (let i = 0; i < checkCollection.collections.length; i++) {
            if (checkCollection.collections[i].set_num == selectedLegoSet.set_num) {
                return res.json({error: "Set already added"});
            }
        }
        const result = await Users.updateOne({username:username}, {$push:{collections:selectedLegoSet}});
        if (!result) {
            return res.json({error: "An error occured."})
        }
        res.json({
            data: "Add build successful."
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
}

export const getExistingCollection = async (req, res) => {
    try {
        const { username } = req.body;
        const result = await Users.findOne({username:username}, 'collections');
        if (!result) {
            return res.json({error: "An error occured."})
        }
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
}

export const removeBuild = async (req, res) => {
    try {
        const { username, selectedBuild } = req.body;
        const result = await Users.updateOne({username:username}, {$pull:{collections:{set_num:selectedBuild.set_num}}});
        if (!result) {
            return res.json({error: "An error occured."})
        }
        return res.json({
            data: "Build removed."
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }    
}