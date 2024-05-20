const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());

// Parse JSON request body
app.use(express.json());
connectDB();
const PORT = process.env.PORT || 3001;


// Define authentication routes
app.use('/auth', authRoutes);

app.get("/",(req,res)=>{
  res.send("we are live now")
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});