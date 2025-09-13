const express = require('express');
const connectToDB = require('./databases/db');
const productRoutes = require('./routes/product-routes');

const app = express();

// Connect to MongoDB
connectToDB();

// Middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
