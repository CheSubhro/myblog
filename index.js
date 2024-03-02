import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import signup from "./routes/signup.js";
import signin from "./routes/signin.js";
import cms from "./routes/cms.js";
import blog from "./routes/blog.js";


const app = express();
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB Connection successfully");

    app.listen(PORT,()=>{
        console.log(`server is running on port:${PORT}`);
    })

}).catch(error=>console.log(error));

app.use("/api",signup);
app.use("/api",signin);
app.use("/api/cms", cms);
app.use("/api/blog",blog);