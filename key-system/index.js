// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Handle the /key-generation endpoint (after returning from Linkvertise)
app.get("/key-generation.html", (req, res) => {
  // Generate a key when they reach this page
  const key = generateKey();
  const expiryTime = Date.now() + 48 * 60 * 60 * 1000; // 48 hours expiry
  keys.push({ key, expiryTime });

  // Send the key and expiry time
  res.send(`
    <h1>Thank you for completing the offer!</h1>
    <p>Your generated key: <strong>${key}</strong></p>
    <p>This key will expire in 48 hours.</p>
    <p><a href="/">Return to the home page</a></p>
  `);
});
