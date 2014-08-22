/*
  my default js helpers
*/
function zQ(selector){return document.querySelector(selector);}
function zQA(selector){return document.querySelectorAll(selector);}
function zAddClass(el,className){if(!((' '+el.className+' ').indexOf(' '+className+' ')>-1)){el.className+=' '+className;}}
function zHasClass(el,className){return new RegExp(' '+className+' ').test(' '+el.className+' ');}
function zRemoveClass(el,className){el.className=el.className.replace(' '+className, '').replace(className, '');}
function zToggleClass(el,className){
  var newClass=' '+el.className.replace(/[\t\r\n]/g," ")+' ';
  if(zHasClass(el,className)){
    while(newClass.indexOf(" "+className+" ")>=0){newClass=newClass.replace(" "+className+" "," ");}
    el.className=newClass.replace(/^\s+|\s+$/g,'');
  }
  else{el.className+=' '+className;}
}
function zBindEvent(el,eventName,eventHandler){
  if(el.addEventListener){el.addEventListener(eventName,eventHandler,false);}
  else if(el.attachEvent){el.attachEvent('on'+eventName,eventHandler);}
}
function zPreviousElementSibling(el){
	if(el.previousElementSibling){return el.previousElementSibling;}
	else{while(el=el.previousSibling){if(el.nodeType===1) return el;}}
}
function zNextElementSibling(el){
	if(el.nextElementSibling){return el.nextElementSibling;}
	else{while(el=el.nextSibling){if(el.nodeType===1) return el;}}
}
function zGetCurrentTargetElement(event){
	if(typeof event.currentTarget!='undefined'){currentTargetElement=event.currentTarget;}
	else{currentTargetElement=window.event.srcElement;}
	return currentTargetElement;
}
function zIsTouchDevice(){
  var isTouch=(('ontouchstart' in window)||(navigator.msMaxTouchPoints>0));
  if(isTouch){zAddClass(document.documentElement,'touch');}
  else{zAddClass(document.documentElement,'notouch');}
}
zIsTouchDevice();