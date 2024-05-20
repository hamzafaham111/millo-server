const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({
  origin:["http://millo.vercel.app"],
  methods:["GET","POST"],
  credentials:true
}));

// Parse JSON request body
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 3001;


// Define authentication routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});