var express = require('express');
var socket = require('socket.io');
var mongoose = require('mongoose');
var Code = require('./model');


var app = express();
var server = app.listen(process.env.PORT || 9000, () => console.log('Server Started'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// connection to mongo
const url = "mongodb://localhost:27017/codepen"
mongoose.connect(process.env.MONGODB_URI || url)
.then(() => {
    console.log("Connected to DB");
})

var io = socket(server);

// make connection 

io.on('connection', (socket) => {

    // confirm when device connected
    console.log('Device Connected : ', socket.id);

    // check if url exists
    socket.on('checkUrl', (url) => {
        Code.findOne({ url : url})
        .then(result => {

            // if found
            if(result != null){
                // emit url found
                socket.emit('found');

                // join a channel
                socket.join(url, () => {
                    console.log("Joined : ",url);
                })
            }
            else{
                // create a new channel
                socket.emit('creating new');
                Code.create({url})
                .then(result => {
                    console.log("Saved to DB");
                    socket.join(url, () => console.log("joined new : ", url))
                })
            }
        })
        .catch(err => console.log(err));
    })

    // update / add the code

    socket.on('xml', (data) => {
        socket.emit('updated xml', data);
    })

    socket.on('css', (data) => {
        socket.emit('updated css', data);
    })

    socket.on('js', (data) => {
        socket.emit('updated js', data);
    })


    // save code
    


})