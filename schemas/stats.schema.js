const { Schema } = require("mongoose");

const StatsSchema = Schema({
    reproductions: {
        default: 0,
        type: Number
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    fullReproductions: {
        type: Number,
        default: 0
    }
});

module.exports = StatsSchema;