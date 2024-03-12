const SongsService = require("./songs.service");

class SongsController {

    async create(req, res) {
        try {

            const { id } = req.user;  
            const song = await SongsService.create(req.body, req.files.song, id);

            return res.status(201).json({
                song,
                msg: "Song created successfully!",
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error,
                msg: "Song creation failed!"
            });
        }
    }

    async getAll(req, res) {
        const { from, limit, sort, order, name, userId } = req.query;
        const query = {
            name: new RegExp(name, 'i'),
            userId
        };
        const songs = await SongsService.getAll(query, from, limit, sort, order);
        return res.json({
            ok: true,
            songs,
            totalsongs: songs.length || 0
        })
    }

    async getSongById(req, res) {
        const song = await SongsService.getOne(req.params.id);
        if (!song)
            return res.json({
                ok: false,
                msg: `Song with id ${req.params.id} not founded`
            });
        return res.json({
            ok: true,
            msg: `Song with id ${song.id} founded`,
            song
        });
    }

    async addFavourite(req, res) {
        try {
            const { id } = req.user;
            await SongsService.addFavouriteSong(id, req.params.id);
            return res.status(200).json({
                msg: "Song added to favourites!",
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error,
                msg: "Favourite adding failed!"
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await SongsService.delete(id);
            return res.status(200).json({
                msg: `Deleted song with id ${id}`,
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error,
                msg: "Delete song failed!"
            });
        }
    }

    async updateSongStats(req, res) {
        try {
            const { id: userId } = req.user;
            const { id } = req.params;
            const { reproductions, fullReproductions, like, dislike } = req.query;
            await SongsService.updateSongStats(id, reproductions, fullReproductions, like, dislike, userId);
            return res.status(200).json({
                msg: `Updated stats for song with id ${id}`,
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error,
                msg: "Update songs stats failed!"
            });
        }
    }
}

module.exports = new SongsController();