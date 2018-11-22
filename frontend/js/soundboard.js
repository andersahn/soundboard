// load sounds.json using XHR
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
			window.alert('Could not load sounds.json');
		}
	}
};

function insertAudioElement(object) {
	var clone = document.getElementById('template').cloneNode(true); // true means clone all childNodes and all event handlers

	// play <button>
	var button = clone.getElementsByTagName('button')[0];
	button.id = "button-" + object.id;
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
}

function play(id) {
	var audio = document.getElementById(id);
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0
	}
}
