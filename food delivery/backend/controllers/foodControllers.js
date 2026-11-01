import foodModel from "../models/foodModel.js";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const uploadsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../uploads");

// add food item

const addFood = async (req,res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload an image using the 'image' field." });
  }

  const food = new foodModel({
  name:req.body.name,
  description:req.body.description,
  price:req.body.price,
  category:req.body.category,
  image:req.file.filename
  })
  try {
    await food.save();
    res.json({success:true,message:"Food Added"})
  } catch (error) {
     console.error("Failed to save food:", error);
     try {
       await unlink(path.join(uploadsDir, req.file.filename));
     } catch (cleanupError) {
       console.error("Failed to remove image after food save failed:", cleanupError);
     }
     res.status(500).json({success:false,message:error.message})
  }

 }

 // all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Failed to load food list:", error);
    res.status(500).json({ success: false, message: "Failed to load food list" });
  }
};

// remove food item
const removeFood = async (req,res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    try {
      await unlink(path.join(uploadsDir, food.image));
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Failed to remove food image:", error);
        return res.status(500).json({ success: false, message: "Food removed, but its image could not be deleted" });
      }
    }

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Failed to remove food:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addFood, listFood,removeFood};