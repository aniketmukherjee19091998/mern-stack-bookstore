import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for the body to parse json
app.use(express.json());
// Middleware for handling cors policy
// This is not ideal way to do it!
// app.use(cors());

// Allow custom origin, more accepted way to solve CORS error
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)


app.get("/", (req, res) => {
    return res.status(200).send("get request successful")
});

app.use("/books", booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("database connection successful")

        app.listen(PORT, (req, res) => {
            console.log(`server is running at ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Error : ", error)
    });
