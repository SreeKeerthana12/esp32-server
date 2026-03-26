const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// 🔹 Create uploads folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 🔹 Accept raw image data (robust)
app.use(express.raw({
    type: ['image/jpeg', 'application/octet-stream'],
    limit: '10mb'
}));

// 🔹 Health check
app.get('/', (req, res) => {
    res.send("Server running");
});

// 🔹 Upload endpoint
app.post('/upload', (req, res) => {
    try {
        console.log("Request from:", req.ip);

        if (!req.body || req.body.length === 0) {
            return res.status(400).send("No image received");
        }

        const filename = `image_${Date.now()}.jpg`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, req.body);

        console.log("Saved:", filename, "| Size:", req.body.length);

        res.send("OK");
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).send("Error");
    }
});

// 🔹 Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});