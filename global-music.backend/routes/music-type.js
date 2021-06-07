const router = require("express").Router();
const musicTypeService = require("../services/music-type.service");

module.exports = (app) => {
  app.use("/music-type", router);
};

router.get("/", (req, res) => {
  res.render("manage-music-type");
});

router.get("/list", async (req, res) => {
  try {
    const data = await musicTypeService.findAll();
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    await musicTypeService.create(name);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.put("/update", async (req, res) => {
  const payload = req.body;
  try {
    await musicTypeService.edit(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await musicTypeService.delete(id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});
