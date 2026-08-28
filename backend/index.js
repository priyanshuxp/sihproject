import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/controllers/routes.js";
import errorHandler from "./src/utils/errorHandler.js";

const port = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit:"10mb", extended: true}));

app.use("/api",router);

app.get("/", (req, res) => {
    res.send("SIH backend running...")
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})