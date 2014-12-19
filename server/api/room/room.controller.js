'use strict';

var _ = require('lodash');
var Room = require('./room.model');
var User = require('../user/user.model');

// Get list of rooms
exports.index = function(req, res) {
    Room.find(function (err, rooms) {
        if(err) { return handleError(res, err); }
        return res.json(200, rooms);
    });
};

// Get a single room
exports.show = function(req, res) {
    Room.findById(req.params.id, function (err, room) {
        if(err) { return handleError(res, err); }
        if(!room) { return res.send(404); }
        return res.json(room);
    });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
    Room.create(req.body, function(err, room) {
        if(err) { return handleError(res, err); }
        return res.json(201, room);
    });
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Room.findById(req.params.id, function (err, room) {
        if (err) { return handleError(res, err); }
        if(!room) { return res.send(404); }
        var updated = _.merge(room, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, room);
        });
    });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
    Room.findById(req.params.id, function (err, room) {
        if(err) { return handleError(res, err); }
        if(!room) { return res.send(404); }
        room.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

// Adds a message to the corresponding room
exports.createmessage = function(req, res, next) {
    var newMessage = req.body.messages;
    Room.findById(req.params.id, function(err, room) {
        if (err) {return handleError(res, err);}
        if (!room) {return res.send(404);}
        User.findById(newMessage.name, function(err, user) {
            if (err) return next(err);
            if (!user) return res.send(401);
            newMessage.name = user.profile.name;
            newMessage.sent = Date.now();
            var updated = room;
            updated.messages.push(newMessage);
            updated.save(function(err) {
                if(err) {return handleError(res, err);}
                return res.json(201, updated.messages[updated.messages.length-1]);
            });
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
