const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs").promises;

const router = Router();
const dbFilePath = "db/db.json";

router.get('/api/notes', async (req, res) => {
  try {
    const data = await fs.readFile(dbFilePath, "utf8");
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes." });
  }
});

router.post('/api/notes', async (req, res) => {
  try {
    const data = await fs.readFile(dbFilePath, "utf8");
    const notes = JSON.parse(data);

    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };

    notes.push(newNote);

    await fs.writeFile(dbFilePath, JSON.stringify(notes));
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to add the note." });
  }
});

router.delete('/api/notes/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dbFilePath, "utf8");
    const notes = JSON.parse(data);

    const newNotes = notes.filter((note) => note.id !== req.params.id);

    await fs.writeFile(dbFilePath, JSON.stringify(newNotes));
    res.json("Note deleted.");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the note." });
  }
});

module.exports = router;