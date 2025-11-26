import connectDb from "../../config/database.js"
import Test from "../../models/tests/user.js";

export const addData = async (req, res) => {
    try {
        await connectDb();

        const data = await Test.create(req.body);
        res.status(201).json({message: "user created", user: data})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};