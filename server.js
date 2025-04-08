const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
const fs = require('fs');
const path = require('path');
app.set('view engine', 'ejs');

// Set the views directory (optional if you keep views in the default "views" folder)
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the gallery page
app.get('/slike', (req, res) => {
  // Read the images from images.json
  fs.readFile(path.join(__dirname, 'images.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading images data.");
    }

    const images = JSON.parse(data);

    // Render the gallery with the images
    res.render('slike', { images });
  });
});
app.get('/', (req, res) => {
const dataPath = path.join(__dirname, 'images.json');
const images = JSON.parse(fs.readFileSync(dataPath));
res.render('slike', { images });
});
app.get('/', (req, res) => {
    res.redirect('/slike');});
    
app.listen(PORT, () => {
console.log('Server pokrenut na portu ${PORT}');
});
