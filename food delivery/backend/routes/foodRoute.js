import express from "express";
import { addFood,listFood,removeFood} from "../controllers/foodControllers.js";
import multer from "multer"
import path from "node:path";
import { fileURLToPath } from "node:url";

const foodRouter = express.Router();
const uploadsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../uploads");

// image storage Engine

const storage = multer.diskStorage({
    destination: uploadsDir,
    filename:(req,file,cd)=>{
    return cd(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);




export default foodRouter; 