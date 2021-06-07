const router = require("express").Router();
const albumService = require("../services/album.service");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

module.exports = (app) => {
  app.use("/album", router);
};

router.get("/", (req, res) => {
  res.render("manage-album");
});

router.get("/list/:num?", async (req, res) => {
  const { num } = req.params;
  try {
    const itemPerPage = 8 * num || 100;
    const data = await albumService.findAll(itemPerPage);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await albumService.findBySinger(id);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const id = await albumService.create(payload);
    return res.status(200).json({ id });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/thumbnail/:id", upload.single("thumbnail"), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  await albumService.updateThumbail(id, filename);
  res.json({ message: filename });
});

router.put("/update", async (req, res) => {
  const { payload } = req.body;
  try {
    await albumService.edit(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await albumService.delete(id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});
