
chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create({id:"rightclick", title:"Create Streamable", contexts:["all"]});
});
chrome.contextMenus.onClicked.addListener(function(info){
	 console.log(info.pageUrl);
	 makeReq(info.pageUrl);
});
//makes first request
function makeReq(url){
	//uploads initial video
	var searchurl = "https://api.streamable.com/import?url=" + url;
	var xhr = new XMLHttpRequest();
	xhr.open("GET",searchurl,false);
	xhr.send();
	//console.log(xhr.responseText);
	//getting uploaded video and checking completion
	var returnObj = JSON.parse(xhr.response);
	//console.log(returnObj);
	//send data to popup
	buildPopup(returnObj.shortcode);
}
//makes second request and builds popup
function buildPopup(shortcode){
	var searchurl = "https://api.streamable.com/videos/" + shortcode;
	var xhr = new XMLHttpRequest();
	xhr.open("GET",searchurl,false);
	xhr.send();
	var vid = JSON.parse(xhr.response);
	if(vid.status == 2){
		console.log(vid.url);
		prompt("Link", "www." + vid.url);
	}else{
		buildPopup(shortcode);
	}
}






