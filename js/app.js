//http://www.html5rocks.com/en/tutorials/getusermedia/intro/
//https://github.com/samdutton/simpl/blob/master/getusermedia/sources/js/main.js

document.getElementById('btnSnapshot').onclick = snapshot;
document.getElementById('btnRedo').onclick = redo;
document.getElementById('sourcesVideo').onchange = showCameraFeed;

var sourcesVideo = document.getElementById('sourcesVideo');
var btnSnapshot = document.getElementById('btnSnapshot');
var btnRedo = document.getElementById('btnRedo');
var linkSave = document.getElementById('linkSave');
var videoElement = document.getElementById('video');
var canvasElement = document.getElementById('canvas');
var ctx = canvasElement.getContext('2d');
var x;
var y;

navigator.getUserMedia  = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

function snapshot() {
	btnSnapshot.style.display = 'none';
	btnRedo.style.display = 'block';
	linkSave.style.display = 'block';
	canvasElement.style.display = 'block';
	canvasElement.width = videoElement.videoWidth;
	canvasElement.height = videoElement.videoHeight;
	ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
	videoElement.style.display = 'none';
	var currentdate = new Date();
	var datetime = currentdate.getDate() + "-"
				+ (currentdate.getMonth()+1)  + "-"
				+ currentdate.getFullYear() + "-"
				+ currentdate.getHours() + "-"
				+ currentdate.getMinutes() + "-"
				+ currentdate.getSeconds();
	linkSave.href = canvasElement.toDataURL('image/jpeg');
	linkSave.download = datetime + '.jpg';
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'Take photo', 'Gone through the snapshot function']);
	}
	return false;//use preventdefault
}

function redo(){
	btnSnapshot.style.display = 'block';
	btnRedo.style.display = 'none';
	canvasElement.style.display = 'none';
	videoElement.style.display = 'block';
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'Retake photo', 'Gone through the redo function']);
	}
	return false;//use preventdefault
}

if (typeof MediaStreamTrack === 'undefined'){
	alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
	if(_gaq){
		_gaq.push(['_trackEvent', 'Messages', 'Error', 'No support for MediaStreamTrack']);
	}
} else {
	MediaStreamTrack.getSources(gotSources);
	if(_gaq){
		_gaq.push(['_trackEvent', 'Messages', 'Success', 'Has support for MediaStreamTrack']);
	}
}

function gotSources(sourceInfos) {
	for (var i = 0; i != sourceInfos.length; ++i) {
		var sourceInfo = sourceInfos[i];
		var option = document.createElement("option");
		option.value = sourceInfo.id;
		if (sourceInfo.kind === 'video') {
			//option.text = sourceInfo.label;
			option.text = /*'camera facing: '+*/sourceInfo.facing+' facing';
			sourcesVideo.appendChild(option);
		} else {

		}
	}
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'Sources', 'Gone through the gotSources function']);
	}
}
function successCallback(stream) {
	window.stream = stream;
	videoElement.src = window.URL.createObjectURL(stream);
	videoElement.play();
	/*setTimeout(function() {
		videoElement.height=window.innerHeight;
		videoElement.width=window.innerWidth;
		alert(window.innerHeight+' '+videoElement.videoHeight)
	},1000)*/
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'Stream', 'Gone through the successCallback function']);
	}
}
function errorCallback(error){
	console.log("navigator.getUserMedia error: ", error);
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'Stream', 'Gone through the errorCallback function ('+error+')']);
	}
}
function showCameraFeed(){
	if (!!window.stream) {
		videoElement.src = null;
		window.stream.stop();
	}
	var videoSourceId = sourcesVideo.value;
	var constraints = {
	    video: {
	      optional: [{sourceId: videoSourceId}]
	    }
	  };
	navigator.getUserMedia(constraints, successCallback, errorCallback);
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'Stream', 'Gone through the showCameraFeed function']);
	}
}
showCameraFeed();

//hide header
setTimeout(function() {
	zToggleClass(zQ('.js-header'),'hide');
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'UI', 'Hide header on load']);
	}
}, 2000)
zBindEvent(zQ('.js-btn_showHeader'),"click",function(){
	zToggleClass(zQ('.js-header'),'hide');
	zToggleClass(zQ('.js-btn_showHeader'),'btn_hideHeader');
	zToggleClass(zQ('.js-btn_showHeader'),'js-btn_hideHeader');
	if(_gaq){
		_gaq.push(['_trackEvent', 'Camera app', 'UI', 'Toggle header visibility']);
	}
})
