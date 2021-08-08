const { Friend }= require('../models');
const { ObjectId } = require("mongoose").Types;
const _ = require('lodash');

exports.sendFriendRequest = async (req, done) => {
    const { user_id, body: { friend_id } } = req;
    try {
        const friendPayload = new Friend({
            user_id,
            friend_id
        });
        let friendInstance = await friendPayload.save();
        return done(null, friendInstance);
    } catch(err) {
        return done(err);
    }
};

exports.updateFriendRequest = async (body, id, done) => {
    try {
        let friendInstance = await Friend.findOne({_id: id});
        if (_.isEmpty(friendInstance)) {
            return done('Friend request does not exists');
        }
        friendInstance.status = body.status;
        friendInstance = await friendInstance.save();
        return done(null, friendInstance);
    } catch(err) {
        return done(err);
    }
};

exports.getFriendList = async (req, done) => {
    try {
        let queryArray = [];
        queryArray.push({
          $lookup: {
            from: "User",
            localField: "friend_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $match: {
            $or: [
               { user_id: ObjectId(req.user_id) }, 
               { friend_id: ObjectId(req.user_id) } 
            ],
            status: 'ACCEPTED'
        }},
        {$unwind: '$user'},
        );
    
        let friendList = await Friend.aggregate(queryArray);
        if (!friendList.length) {
            return done(null, []);
        }
        return done(null, friendList);
    } catch(err) {
        return done(err);
    }
};

exports.getPendingRequest = async (req, done) => {
    try {
        let queryArray = [];
        queryArray.push({
          $lookup: {
            from: "User",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $match: {friend_id: ObjectId(req.user_id), status: 'PENDING'}},
        {$unwind: '$user'},
        );
    
        let pendingList = await Friend.aggregate(queryArray);
        if (!pendingList.length) {
            return done(null, []);
        }
        return done(null, pendingList);
    } catch(err) {
        return done(err);
    }
};