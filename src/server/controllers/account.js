import Users from "../models/user";
require("dotenv").config();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({username:username, password:password});
        if (!user) {
            return res.json({error: "Incorrect username or password!"});
        }
        res.json({data: "Login successful"});
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkUser = await Users.findOne({username:username});
        if (checkUser) {
            return res.json({error: "Username already taken!"});
        }
        const user = await Users.create({username:username, password:password});
        if (!user) {
            return res.json({error: "An error occured."});
        }
        res.json({
            data: "Signup successful"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { username } = req.body;
        const result = await Users.deleteOne({username:username});
        if (!result) {
            return res.json({error: "No account"});
        }
        return res.json({
            data: "Delete successful"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }    
}