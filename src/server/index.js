import express from 'express';
import authRoutes from './routes/auth';

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Successfully connected to MongoDB Atlas!");
}).catch((error) => {
  console.log("Unable to connect to MongoDB Atlas!");
  console.error(error);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/api", authRoutes);
app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
