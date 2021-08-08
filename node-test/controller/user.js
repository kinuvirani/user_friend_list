const {User, Friend}= require('../models');
const JWT = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const passwordHash = require('password-hash');

const secretKey = config.get('keys.jwt_secret_key');

exports.signUp = async (body, done) => {
    const {email, password} = body;
    try {
        let userInstance = await User.findOne({email: email});
        if (!_.isEmpty(userInstance)) {
            return done('Email already exists');
        }
        const userPayload = new User({
            ...body,
            password: passwordHash.generate(password)
        });
        userInstance = await userPayload.save();
        return done(null, userInstance);
    } catch(err) {
        return done(err);
    }
};

exports.signIn = async (body, done) => {
    const {email, password} = body;
    try {
        let userInstance = await User.findOne({email: email});
        if (_.isEmpty(userInstance)) {
            return done('Email does not exists');
        }
        if (!passwordHash.verify(password, userInstance.password)) {
            return done('Incorrect password');
        }
        let tokenPayload = {
            firstname: userInstance.firstname,
            lastname: userInstance.lastname,
            email: userInstance.email,
            user_id: userInstance._id
        };
        let token= JWT.sign(tokenPayload, secretKey);
        tokenPayload.token = token;
        return done(null, tokenPayload);
    } catch(err) {
        return done(err);
    }
};

exports.getUserList = async (req, done) => {
    try {
        let ignoreList = [];
        let friendList = await Friend.find({user_id: req.user_id, status: {$in: ['PENDING', 'ACCEPTED']}});
        ignoreList = _.map(friendList, 'friend_id');
        ignoreList.push(req.user_id);
        let userInstance = await User.find({_id: {$nin: ignoreList}});
        if (!userInstance.length) {
            return done(null, []);
        }
        return done(null, userInstance);
    } catch(err) {
        return done(err);
    }
};