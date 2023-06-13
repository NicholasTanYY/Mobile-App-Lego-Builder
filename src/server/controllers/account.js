import Users from "../models/user";
require("dotenv").config();
const bcrypt = require("bcrypt");

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await Users.findOne({username:username}, "password");
        if (!hashedPassword) {
            return res.json({error: "Incorrect username or password!"});
        } 
        const result = await bcrypt.compare(password, hashedPassword.password);
        if (!result) {
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({username:username, password:hashedPassword});
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