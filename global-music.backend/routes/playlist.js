const router = require("express").Router();
const playlistService = require("../services/playlist.service");

module.exports = (app) => {
  app.use("/playlist", router);
};

router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await playlistService.findOneById(id);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await playlistService.findAll(id);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    await playlistService.create(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.put("/update", async (req, res) => {
  const payload = req.body;
  try {
    await playlistService.edit(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await playlistService.delete(id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/add-music", async (req, res) => {
  const payload = req.body;
  try {
    await playlistService.addMusic(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/remove-music", async (req, res) => {
  const payload = req.body;
  try {
    await playlistService.removeMusic(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});
