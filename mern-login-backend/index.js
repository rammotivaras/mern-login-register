import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

db.once("open", () => {
    console.log("DB connected");
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.send({ success: true, message: "Login Successful", user: user });
            } else {
                res.status(401).send({ success: false, message: "Incorrect password" });
            }
        } else {
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate and sanitize input data (you can use express-validator here)

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            res.status(400).send({ message: "User already registered" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            res.send({ message: "Successfully Registered, Please login now.", user: newUser });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.listen(9002, () => {
    console.log("server started at port 9002");
});
