const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const mediaDir = path.join(__dirname, 'media');

app.use(express.static('.')); // Serve static files

// Endpoint to get the list of images
app.get('/images', (req, res) => {
    fs.readdir(mediaDir, (err, files) => {
        if (err) {
            res.status(500).send('Error reading the media directory');
            return;
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});