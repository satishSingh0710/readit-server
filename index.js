import express from "express"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url";
import { register, login } from "./controllers/auth.js"; 

// configurations for middlewares
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 dotenv.config(); 
 const app = express();
 app.use(express.json()); 
 app.use(morgan("common")); 
 app.use(helmet()); 
 app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); 
 app.use(cors()); 
 app.use(bodyParser.json({limit: "30mb", extended: true}));
 app.use(bodyParser.urlencoded({limit: "30mb", extended: true})); 

//  mongoose setup 
app.post("/auth/register", register); 
app.post("/auth/login", login); 


const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    dbName: "test",
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log("MongoDB connected");
        console.log(`Server started on PORT ${PORT}`); 
    })
})