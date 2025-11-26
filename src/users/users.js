import User from "../../models/user/User.js";
import connectDb from "../../config/database.js";

export const addUser = async (req, res) => {
    try {
        await connectDb();

        // Auth0 user info comes from req.oidc.user
        const { sub, email, name, picture } = req.oidc.user;

        if (!sub || !email) {
            return res.status(400).json({ message: "Invalid Auth0 profile" });
        }

        // Check if user already exists
        let user = await User.findOne({ auth0Id: sub });

        if (!user) {
            user = await User.create({
                auth0Id: sub,
                email,
                name,
                picture,
                role: "user" // default role
            });
        }

        res.status(200).json({
            message: "User added via Auth0",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};