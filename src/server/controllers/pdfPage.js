import Users from "../models/user";
require("dotenv").config();

export const updateBuildPage = async (req, res) => {
    try {
        const { username, build, pageNumber } = req.body;
        const result = await Users.updateOne(
            {username: username, "collections.set_num": build.set_num},
            {$set: {"collections.$.currentPage": pageNumber}});
        if (!result) {
            return res.json({error: "An error occured."})
        }
        return res.json({
            data: "Page updated."
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }    
}