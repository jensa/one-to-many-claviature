
var socket = io('http://localhost');
socket.on('playerOrPiano', function (data) {
  socket.emit('clientType', { type: 'player' });
});

function playNote(note){
  socket.emit('playingNote', {note:note});

  $('#'+note).css("background-color", "black");
  setTimeout(function(){
    $('#'+note).css("background-color", "white");
  }, 200);
}

$('.noteChoice').click(function(){
  var chosenNote = $(this).attr ( "id" );
  playNote(chosenNote);
});

$(document).bind('keyup', function(e){
  var pressed = String.fromCharCode(e.which);
  playNote(pressed);
});
