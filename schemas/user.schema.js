const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    description: {
        type: String
    },
    subscribers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    subscriptions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    favouriteSongs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    publicProfile: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String
    },
    role: {
        type: String,
        default: 'USER'
    }
}, {
    timestamps: true,
    versionKey: false
});


UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.userId = _id;
    return user;
}

module.exports = model('User', UserSchema);