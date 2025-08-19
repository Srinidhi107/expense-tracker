const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form data (if we POST later)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
