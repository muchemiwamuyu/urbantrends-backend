import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/database.js";
import testingRoutes from './src/routes/testRoutes/testRoutes.js'
import userRoutes from './src/routes/users/usersRoutes.js'
import projectRoutes from './src/routes/projectRoutes/projectRoutes.js'
import productsRoutes from './src/routes/productRoutes/productsRoutes.js'
import serviceRoutes from './src/routes/services/serviceRoutes.js'
import blogRoutes from './src/routes/blogsRoutes/blogRoutes.js'
import developerRoutes from './src/routes/developers/projectRoutes.js'
import orderRoutes from './src/routes/orders/contactRoutes.js'
import ordersRoutes from './src/routes/orders/orderRoutes.js'
import projectsSales from './src/routes/developers/projectSales.js'
import projectAccess from './src/routes/developers/accessRoutes.js'
import { auth } from "express-openid-connect";
import cors from 'cors'


dotenv.config();

const app = express()
const port = process.env.PORT || 4000

app.use(express.json());

await connectDb(); // make sure DB connected

const allowedOrigins = [
    "http://localhost:5173",
    "https://www.urbantrends.dev",
    "https://urbantrends.dev",
    "https://developers.urbantrends.dev"
]

app.use (
    cors ({
        origin: (origin, callback) =>{
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error ("Not allowed by cors"));
            }
        },
        credentials: true,
    })

);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

app.use(auth(config));

// Routes
app.get('/', (req, res) => res.send('Backend running'));
app.use('/tests', testingRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/products', productsRoutes);
app.use('/services', serviceRoutes);
app.use('/blogs', blogRoutes);
app.use('/developers', developerRoutes);
app.use('/orders', orderRoutes);
app.use('/api', ordersRoutes);
app.use('/sale', projectsSales);
app.use('/dev', projectAccess)

app.listen(port, () => {
  console.log(`HTTP server running on http://localhost:${port}`);
});
