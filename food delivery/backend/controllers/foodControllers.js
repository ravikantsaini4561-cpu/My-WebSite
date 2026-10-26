import foodModel from "../models/foodModel.js";
import fs from 'fs'


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
     res.status(500).json({success:false,message:error.message})
  }

 }

 // all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req,res) => {
     try {
          const food = await foodModel.findByID(req.body.id);
          fs.unlink('uploads/${food.image}',()=>{})

          await foodModel.findByIDAndDelete(req.body.id);
          res.json({success:true,message:"Food Removed"})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error "})
      }
}

export { addFood, listFood,removeFood};