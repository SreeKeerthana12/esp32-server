const express = require('express');
const app = express();

app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));

app.get('/', (req, res) => {
    res.send("Server running");
});

app.post('/upload', (req, res) => {
    console.log("Image received, size:", req.body.length);
    res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});