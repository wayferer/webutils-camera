function picChange(event){
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
}