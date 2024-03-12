const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../schemas/user.schema');
const Song = require('../schemas/song.schema');

const Utils = require('../common/utils/utils');
const { errorFactory } = require("../common/exception.factory");
const { cloudinaryDelete, cloudinaryBase64ImageUpload } = require('../common/cloudinary.upload');

class UsersService {

    create(name, email, password, description="") {
        const user = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            description
        });
        return user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email }).exec();
        if(!user) {
            throw errorFactory(`User with email ${email} not found`, 401);
        }
        if(!bcrypt.compareSync(password, user.password)){
            throw errorFactory("Invalid password", 401);
        }
        const token = jwt.sign({ id: user.id }, process.env.KEY, { expiresIn: '2h', algorithm: 'HS256' });
        return { user, token };
    }

    async getAll(query={}, from=0, limit=10, sort='_id', order='asc') {
        return await User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .sort(Utils.parseSort(sort, order))
            .exec();
    }

    async getOne(id) {
        return await User.findById(id)
            .populate('subscriptions')
            .populate('subscribers')
            .populate('favouriteSongs')
            .populate('songs')
            .exec();
    }

    async getByEmail() {
        return await User.find({email}).exec();
    }

    async subscribe(id, subscriptionId) {
        await User.findByIdAndUpdate(subscriptionId, {
            $addToSet: {
                subscribers: id
            }
        }).exec();
        return await User.findByIdAndUpdate(id, {
            $addToSet: {
                subscriptions: subscriptionId
            }
        }, { new: true }).exec();
    }

    async unsubscribe(id, unsubscriptionId) {        
        await User.findByIdAndUpdate(unsubscriptionId, {
            $pull: {
                subscribers: id
            }
        }).exec();
        return await User.findByIdAndUpdate(id, {
            $pull: {
                subscriptions: unsubscriptionId
            }
        }, { new: true }).exec();
    }

    async update(id, updateUser) {

        let user = await User.findById(id).exec();

        const { name, description, publicProfile, password, role, img } = updateUser;

        if (name) user.name = name;
        if (description) user.description = description;
        if (publicProfile) user.publicProfile = publicProfile;
        if (role) user.role = role;
        if (password) user.password = bcrypt.hashSync(password, 10);
        
        if (img) {
            if (user.imgUrl) cloudinaryDelete(user.imgUrl, 'Images');
            let { url } = await cloudinaryBase64ImageUpload(img);
            user.imgUrl = url;
        }
              
        user.updatedAt = Date.now();
        return user.save();
    }

    async delete(userId) {

        const songs = await Song.find({ author: userId }).exec();
        const user = await User.findByIdAndDelete(userId).exec();

        await Song.deleteMany({ author: user }).exec();
        await songs.forEach( song => {
            console.log(song)
            if (song.imageUrl) cloudinaryDelete(song.imageUrl, 'Images');
            cloudinaryDelete(song.songUrl, 'Songs');
        });

    }

}

module.exports = new UsersService();