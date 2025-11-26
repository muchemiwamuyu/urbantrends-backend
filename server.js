import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/database.js";
import testingRoutes from './src/routes/testRoutes/testRoutes.js'
import userRoutes from './src/routes/users/usersRoutes.js'
import projectRoutes from './src/routes/projectRoutes/projectRoutes.js'
import productsRoutes from './src/routes/productRoutes/productsRoutes.js'
import serviceRoutes from './src/routes/services/serviceRoutes.js'
import blogRoutes from './src/routes/blogsRoutes/blogRoutes.js'
import { auth } from "express-openid-connect";


dotenv.config();

const app = express()
const port = process.env.PORT || 4000

app.use(express.json());

await connectDb(); // make sure DB connected

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

app.listen(port, () => {
  console.log(`HTTP server running on http://localhost:${port}`);
});
