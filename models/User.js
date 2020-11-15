const bcrypt = require('bcryptjs');
const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create user Schema
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        status:{
            type: String,
            default:1
        },
        createdAt: Date,
        userID: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);