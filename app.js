var express = require('express')
var app = express()
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
  res.render('pianoclient', {});
})
app.get('/host', function (req, res) {
  res.render('pianoHost', {});
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})
var io = require('socket.io').listen(server);

notes = {A:[], B:[], C:[], D:[], E:[], F:[], G:[]};

io.on('connection', function (socket) {
  //We have a new client - figure out if its the piano player or a note
  socket.emit('playerOrPiano', {});

  var chosenNote;
  socket.on('clientType', function (data) {
    if(data.type == 'player')
      player = socket;
    console.log("clientType recieved, result: " + data.type);
  });

  socket.on('noteChoice', function (data){
    notes[data.note].push(socket);
    if(chosenNote == undefined){
      chosenNote = data.note;
      return;
    }

    var oldIndex = notes[chosenNote].indexOf(socket);
    if (oldIndex > -1) {
      notes[chosenNote].splice(oldIndex, 1);
    }
    chosenNote = data.note;

    console.log("noteChoice recieved, result: " + data.note);
  });

  socket.on('playingNote', function (data){
    if(notes[data.note] == undefined)
      return;
    notes[data.note].forEach(function(socket){
      socket.emit('play', {note:data.note});

    });
    console.log("playingNote recieved, result: " + data.note);
  });

});
