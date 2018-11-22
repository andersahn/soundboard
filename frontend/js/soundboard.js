// attach audio listeners
function endPlay()
{
	document.getElementById('hmm').classList.remove('playing');
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'sounds.json');
xhr.send(null);

xhr.onreadystatechange = function () {
	if (xhr.readyState === 4) {
		console.log(xhr.status);
		if (xhr.status === 200) {
			var obj = JSON.parse(xhr.responseText);
			console.log(obj.length);
			for (i=0; i < obj.length; i++) {
				insertAudioElement(obj[i]);
			}


		} else {
			console.log('Error: ' + xhr.status);
		}
	}
};

function insertAudioElement(object)
{
	var div = document.getElementById('template');
	var clone = div.cloneNode(true); // true means clone all childNodes and all event handlers

	// play <button>
	var button = clone.getElementsByTagName('button')[0];
	button.id = "button-"+object.id;
	button.setAttribute('onclick', "play('" + object.id + "')");
	button.innerHTML = object.name;

	//<audio>
	var audioElement = clone.getElementsByTagName('audio')[0];

	audioElement.setAttribute('onplay', "document.getElementById('button-" + object.id + "').classList.add('playing');");
	audioElement.setAttribute('onended', "document.getElementById('button-" + object.id + "').classList.remove('playing');");
	audioElement.setAttribute('src', object.path);
	audioElement.setAttribute('id', object.id);
	//clone.id = object.id;

	// add the template clone to html
	//document.body.appendChild(clone);
	var div = document.getElementById('audio-container');
	div.appendChild(clone);


	return;
	var test = document.getElementById('template');
	console.log(test);

	var el = document.createElement('div');


	console.log(object.name);
	el.classList.add('track');
	el.innerHTML = "<audio\n" +
	 "\t\t\tid=\"" +
	 object.id +
	 "\"\n" +
	 "\t\t\tsrc=\"" +
	 object.path +
	 "\" preload=\"none\"\n" +
	 "\t\t\tonplay=\"document.getElementById('button-" +
	 object.id +
	 "').classList.add('playing');\"\n" +
	 "\t\t\tonended=\"document.getElementById('button-" +
	 object.id +
	 "').classList.remove('playing');\">\n" +
	 "\n" +
	 "\t</audio>\n" +
	 "\t<button id=\"button-" +
	 object.id +
	 "\" onclick=\"play('" +
	 object.id +
	 "');\" class=\"button-play\">" +
	 object.name +
	 "</button>\n";

	div.appendChild(el);
	//document.body.appendChild(el);
//		insertAfter(div, el);


}

//function insertAfter(newNode, referenceNode) {
//	console.log(referenceNode.parentNode);
//	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
//}

function play(id) {
	console.log(id);
	var audio = document.getElementById(id);
	if (audio.paused) {
		audio.play();
	}else{
		audio.pause();
		audio.currentTime = 0
	}
}
