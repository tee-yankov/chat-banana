/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Room = require('./room.model');

exports.register = function(socket) {
    Room.schema.pre('save', function (next) {
        this.wasNew = this.isNew;
        next();
    })
    Room.schema.post('save', function (doc) {
        if (doc.wasNew) {
            onSave(socket, doc);
        } else {
            var length = doc.messages.length-1;
            onSave(socket, doc.messages[length]);
        }
    });
    Room.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('room:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('room:remove', doc);
}