const { Router } = require('express');

const router = Router();

const SongsController = require('../songs/songs.controller');
const SongsGuard = require('../songs/songs.guard');

router.post('/songs', SongsGuard.create, SongsController.create);

router.get('/songs', SongsGuard.getAll, SongsController.getAll);
router.get('/song/:id', SongsGuard.getSongById, SongsController.getSongById);

router.patch('/songs/favourite/:id', SongsGuard.addFavourite, SongsController.addFavourite);
router.patch('/songs/stats/:id', SongsGuard.stats, SongsController.updateSongStats);

router.delete('/songs/:id', SongsGuard.delete, SongsController.delete);

module.exports = router;