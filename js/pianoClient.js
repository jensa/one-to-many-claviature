
var socket = io('http://localhost');
var chosenNote;
socket.on('playerOrPiano', function (data) {
  socket.emit('clientType', { type: 'piano' });
});

socket.on('play', function (data) {
  if(chosenNote == undefined)
    return;
  $('#'+data.note).css("background-color", "black");
  var audio = new Audio('/sound/'+data.note+'.mp3')
  audio.play();
  setTimeout(function(){
    $('#'+data.note).css("background-color", "white");
  }, 200);


});

$('.noteChoice').click(function(){
  //if(chosenNote != undefined)
  //  $('#'+chosenNote).removeClass("selected");
  chosenNote = $(this).attr ( "id" );
  $(this).addClass("selected");
  socket.emit('noteChoice', {note:chosenNote});
});

window.onbeforeunload = function(e){
  socket.close();
};
