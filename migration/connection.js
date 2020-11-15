const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
/**
 * Connecting to mongodb
 */
const connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
            .then((res, err) => {
                if (err) return reject(err);
                console.log('connected to db')
                resolve();
            })
    });
}
const close = () => {
    return mongoose.disconnect();
}

module.exports = { connect, close };
