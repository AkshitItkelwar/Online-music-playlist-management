const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/gaana-clone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// File storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Music schema
const MusicSchema = new mongoose.Schema({
    title: String,
    artist: String,
    filePath: String,
});

const Music = mongoose.model('Music', MusicSchema);

// API routes
app.post('/upload', upload.single('file'), async (req, res) => {
    const { title, artist } = req.body;
    const filePath = req.file.path;

    const newMusic = new Music({ title, artist, filePath });
    await newMusic.save();

    res.status(200).json({ message: 'File uploaded successfully', data: newMusic });
});

app.get('/music', async (req, res) => {
    const music = await Music.find();
    res.status(200).json(music);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
