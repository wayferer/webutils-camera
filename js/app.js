//http://www.syntaxxx.com/accessing-user-device-photos-with-the-html5-camera-api/
/*function picChange(event){
	var fileInput = event.target.files;
	if(fileInput.length>0){
		var windowURL = window.URL || window.webkitURL;
		var picURL = windowURL.createObjectURL(fileInput[0]);
		var photoCanvas = zQ("#capturedPhoto");
		var ctx = photoCanvas.getContext("2d");
		var photo = new Image();
		photo.onload = function(){
			ctx.drawImage(photo, 0, 0, 200, 200);
		};
		photo.src = picURL;
		windowURL.revokeObjectURL(picURL);
	}
}*/
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
//document.getElementById('btnRedo').onclick = redo;

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
	ctx.drawImage(video, 0, 0);
	// canvas.width = '200';
	// canvas.height = '200';
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(video, 0, 0);
	video.style.display = 'none';
	return false;//use preventdefault
}

/*window.onerror = function(a,b,c) {
  alert(a + "; " + b + "; " + c);
}*/