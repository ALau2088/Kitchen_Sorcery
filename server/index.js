const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

// Reads JSON file once on initial reload only. To read again, start server.
let fileRead = false;

io.on('connection', function(socket) {
  if (fileRead === false) {
    fs.readFile(
      path.join(process.cwd() + '/data/challenge_data.json'),
      'utf8',
      (err, data) => {
        if (err) throw err;
        dataToArr = JSON.parse(data);
        for (let i = 0; i < dataToArr.length; i++) {
          setTimeout(
            () => io.emit('order data', dataToArr[i]),
            dataToArr[i].sent_at_second * 1000
          );
        }
      }
    );
    fileRead = true;
  }
  socket.on('change event status', function(data) {
    io.emit('changed event status', data);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
