import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Usermodel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;
        const user = await Usermodel.findOne({ username });

        if (user) {
            return res.json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Usermodel({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: "User Register Succesfully!" });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/login", async (req, res) => {

    const { username, password } = req.body;
    const user = await Usermodel.findOne({ username });
    if (!user) {
        return res.json({ message: "User Doesn't Exists!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Username or Password Is Incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });

});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.senStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
};