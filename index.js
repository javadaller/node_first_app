const express = require("express");
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Import route module and pass your app
require("./routes/userRoutes")(app);

// Use the app variable and listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
