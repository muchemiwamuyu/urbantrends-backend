import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: Number
}, { timestamps: true });

const Test = mongoose.model("Test", userSchema);

export default Test;
