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
document.getElementById('btnRedo').onclick = redo;

var btnSnapshot = document.getElementById('btnSnapshot');
var btnRedo = document.getElementById('btnRedo');
var linkSave = document.getElementById('linkSave');
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x;
var y;
var currentdate = new Date();
var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-"
                + currentdate.getFullYear() + "-"
                + currentdate.getHours() + "-"
                + currentdate.getMinutes() + "-"
                + currentdate.getSeconds();

 function snapshot() {
	btnSnapshot.style.display = 'none';
	btnRedo.style.display = 'block';
	canvas.style.display = 'block';
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	video.style.display = 'none';
	linkSave.href = canvas.toDataURL('image/jpeg');
	linkSave.download = datetime + '.jpg';
	return false;//use preventdefault
}

function redo(){
	btnSnapshot.style.display = 'block';
	btnRedo.style.display = 'none';
	canvas.style.display = 'none';
	video.style.display = 'block';
	return false;//use preventdefault
}