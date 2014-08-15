//http://www.html5rocks.com/en/tutorials/getusermedia/intro/

var video = document.getElementById('video');

navigator.getUserMedia  = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

if (navigator.getUserMedia) {
	navigator.getUserMedia({audio: true, video: true}, function(stream) {
		video.src = window.URL.createObjectURL(stream);
	}, function(e) {
		alert('Reeeejected!', e);
	});
} else {
	alert('getUserMedia() is not supported in your browser');
}

document.getElementById('btnSnapshot').onclick = snapshot;

var btnSnapshot = document.getElementById('btnSnapshot');
var btnRedo = document.getElementById('btnRedo');
var linkSave = document.getElementById('linkSave');
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x;
var y;

 function snapshot() {
	btnSnapshot.style.display = 'none';
	btnRedo.style.display = 'block';
	canvas.style.display = 'block';
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	video.style.display = 'none';
	return false;//use preventdefault
}