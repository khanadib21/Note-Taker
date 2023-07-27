const { Router } = require('express');
const path = require('path');

const router = Router();
const publicDir = path.join(__dirname, '../public');

router.get('/', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  res.sendFile(indexPath);
});

router.get('/notes', (req, res) => {
  const notesPath = path.join(publicDir, 'notes.html');
  res.sendFile(notesPath);
});

module.exports = router;