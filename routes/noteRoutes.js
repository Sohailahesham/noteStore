const express = require('express');
const { get_AllNotes, get_CreatePage, post_CreatePage, get_OneNote, delete_note } = require('../controllers/noteControllers');

const router = express.Router();

router.get('/', get_AllNotes);
router.get('/create', get_CreatePage);
router.post('/create', post_CreatePage)
router.get('/:id', get_OneNote)
router.delete('/:id', delete_note)

module.exports = router;