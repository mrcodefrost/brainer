import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 5000;

const JWT_PASSWORD = process.env.JWT_PASSWORD!;
app.use(express.json());

if (!process.env.MONGODB_URL) {
  throw new Error('MONGODB_URL environment variable is not set');
}

mongoose.connect(process.env.MONGODB_URL)
    .then(
        () => {
            console.log("MongoDB connected");
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    );

app.post("/api/v1/signup", async (req, res) => {

    // TODO:  1) zod validation 2) hash password

    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        });

        res.status(200).json({
            message: "User signed up"
        });

    } catch (error) {

        res.status(401).json({
            message: "User signed up"
        });

    }


});

app.post("/api/v1/signin", async (req, res) => {

    const username = req.body.username;

    try {
        const existingUser = await UserModel.findOne({
            username: username
        });

        if (existingUser) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_PASSWORD);

            res.status(200).json({
                token
            });
        } else {
            res.status(403).json({
                message: "Incorrect username"
            });
        }

    } catch (error) {

        res.status(401).json({
            message: `Error occured : ${error}`
        });

    }

});

app.post("/api/v1/content", (req, res) => {

    const link = req.body.link;
    const type = req.body.type;

});


app.get("/api/v1/content", (req, res) => {

});

app.delete("/api/v1/content", (req, res) => {

});


app.post("/api/v1/brain/share", (req, res) => {

});


app.get("/api/v1/brain/:shareLink", (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
