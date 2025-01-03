const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let validKeys = []; // Replace with a database in the future

// Endpoint to generate a key
app.get("/generateKey", (req, res) => {
  const newKey = Math.random().toString(36).substring(2, 15); // Random key
  validKeys.push(newKey);
  res.json({ key: newKey });
});

// Endpoint to validate a key
app.get("/validateKey", (req, res) => {
  const key = req.query.key;
  if (validKeys.includes(key)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Key system running on port ${PORT}`));
