const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

const MusicService = require("../services/music.service");

module.exports = (app) => {
  app.use("/", router);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

router.get("/manage-music", (req, res) => {
  res.render("manage-music");
});

router.get("/upload-music", (req, res) => {
  res.render("upload-music");
});

router.get("/search", async (req, res) => {
  const args = req.query;
  const data = await MusicService.findSongByName(args);
  return res.json({ data });
});

router.get("/music/list", async (req, res) => {
  try {
    const data = await MusicService.findAll();
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.delete("/music/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await MusicService.delete(id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get("/play/:file", (req, res) => {
  const { file } = req.params;
  const mp3file = fs.readFileSync("./upload/" + file);
  res.set("content-type", "audio/mp3");
  res.send(mp3file);
});

router.post("/title", async (req, res) => {
  const payload = req.body;
  const id = await MusicService.updateTitle(payload);
  res.json({ id });
});

router.post("/mp3/:id", upload.single("mp3"), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  await MusicService.uploadFile(id, filename);
  res.json({ message: filename });
});

router.get("/assets/:url", async (req, res) => {
  const { url } = req.params;
  const file = fs.readFileSync("./upload/" + url);
  res.set("content-type", "image/gif");
  res.send(file);
});

router.get("/music/top/:num", async (req, res) => {
  const { num } = req.params;
  try {
    const data = await MusicService.selectTopMusic(num);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get('/music/one/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MusicService.findOneById(id);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get('/music/comment/list/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MusicService.getCommentOnMusic(id);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
})

router.post('/music/comment/add', async (req, res) => {
  const payload = req.body;
  try {
    await MusicService.addComment(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
})