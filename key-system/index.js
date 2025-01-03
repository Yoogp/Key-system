const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Store keys and their expiry times
let keys = [];

// Function to generate a 12-character alphanumeric key
function generateKey() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 12;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate a new key and set its expiry time (48 hours)
app.get("/generateKey", (req, res) => {
  const key = generateKey();
  const expiryTime = Date.now() + 48 * 60 * 60 * 1000; // 48 hours expiry
  keys.push({ key, expiryTime });
  res.json({ key, expiryTime });
});

// Validate if a key is valid and not expired
app.get("/validateKey", (req, res) => {
  const key = req.query.key;
  const keyData = keys.find((k) => k.key === key);
  if (keyData && keyData.expiryTime > Date.now()) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Key system running on port ${PORT}`));
