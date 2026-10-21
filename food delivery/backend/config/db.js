import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ravikantsaini4561_db_user:NnLzbC1jT2Ss5HuK@cluster0.txaybwz.mongodb.net/food delivery').then(()=>console.log("DB Connected"));
}