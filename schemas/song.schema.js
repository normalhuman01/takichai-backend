const { Schema, model } = require('mongoose');
const StatsSchema = require('./stats.schema');

const SongSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    songUrl: {
        type: String,
        required: [true, 'Song Url is required'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
    },
    description: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    language: {
        type: String,
    },
    popularity: {
        type: String,
        default: 0
    },
    imageUrl: {
        type: String
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    instrumental: {
        type: Boolean,
        required: [true, 'Instrumental is required']
    },
    mood: {
        type: String,
        required: [true, 'Mood is required']
    },
    stats: {
        type: StatsSchema,
        default: () => ({})
    }

}, {
    timestamps: true
});


SongSchema.methods.toJSON = function () {
    const { __v, _id, ...song } = this.toObject();
    song.songId = _id;
    return song;
}

module.exports = model('Song', SongSchema);