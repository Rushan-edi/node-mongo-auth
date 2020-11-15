const express = require('express');
const app = express();
const db = require('./migration/connection');

app.use(express.json());
//Import Routes
app.use('/api/v1', require('./routes/index'));

db.connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Listening on port: ' + process.env.PORT);
    });
});


module.exports = app