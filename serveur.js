const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/videoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const videoSchema = new mongoose.Schema({
    title: String,
    filePath: String,
    views: { type: Number, default: 0 },
});

const Video = mongoose.model("Video", videoSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Route to upload video
app.post("/upload", upload.single("video"), async (req, res) => {
    try {
        const video = new Video({
            title: req.body.title,
            filePath: `/${req.file.filename}`,
        });
        await video.save();
        res.status(200).json({ message: "Video uploaded successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to upload video." });
    }
});

// Route to get all videos
app.get("/videos", async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos." });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
