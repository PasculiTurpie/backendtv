const mongoose = require('mongoose');

const DB = process.env.PASSWORS_DB

mongoose.connect('mongodb://172.19.14.135:27017/tv-operaciones')
.then(() => {
    console.log('Connected to MongoDB');
})

    /* mongoose.connect(`mongodb+srv://jsepulveda:${DB}@televisiondata.7mfoh.mongodb.net/`)
    .then(() => {
        console.log('Connected to MongoDB.');
    }) */


.catch(err => {
    console.error('Error connecting to MongoDB', err);
});