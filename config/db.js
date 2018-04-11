const mongoose = require('mongoose');

// map global promise
mongoose.Promise = global.Promise;

// connect to mongoDB
mongoose.connect('mongodb://apramodya:123456@ds243049.mlab.com:43049/pramodya-pusher-poll')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));