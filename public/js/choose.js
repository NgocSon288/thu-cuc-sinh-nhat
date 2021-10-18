// Choose
const choose = document.getElementsByClassName('choose')[0];
const chooseWrap = document.getElementsByClassName('choose-wrap')[0];
const chooseNo = document.getElementsByClassName('choose-no')[0];
let chooseOk = document.getElementsByClassName('choose-ok')[0];

const greetingItemsT = document.querySelectorAll('.greetingClass p');

const timeAwait =
	(offsetTime * (greetingItemsT.length - 1) + 0.25) * 1000 +
	awaitTimeGreeting +
	offsetTime * 1000 +
	2000;

console.log(timeAwait);

let buttonOkWidth;
let buttonOkHeight;
let buttonOkLeft;
let buttonOkTop;

let minX;
let minY;
let maxX;
let maxY;

const awaitChoose = function () {
	setTimeout(() => {
		choose.classList.remove('d-none');

		buttonOkWidth = chooseOk.offsetWidth;
		buttonOkHeight = chooseOk.offsetHeight;

		let wrapWidth = chooseWrap.offsetWidth;
		let wrapHeight = chooseWrap.offsetHeight;

		chooseOk.style.left = wrapWidth / 2 - buttonOkWidth / 2 - 100 + 'px';
		chooseOk.style.top = wrapHeight / 2 - buttonOkHeight / 2 + 'px';

		window.addEventListener('resize', function () {
			wrapWidth = chooseWrap.offsetWidth;
			wrapHeight = chooseWrap.offsetHeight;
			chooseOk.style.left = wrapWidth / 2 - buttonOkWidth / 2 - 100 + 'px';
			chooseOk.style.top = wrapHeight / 2 - buttonOkHeight / 2 + 'px';
		});

		buttonOkLeft = parseInt(chooseOk.style.left);
		buttonOkTop = parseInt(chooseOk.style.top);

		minX = buttonOkLeft - buttonOkWidth;
		minY = buttonOkTop - buttonOkHeight;
		maxX = buttonOkLeft + buttonOkWidth;
		maxY = buttonOkTop + buttonOkHeight;
	}, timeAwait);
};

chooseOk.addEventListener('click', function () {
	window.location.href = '/thu-cuc-sinh-nhat/index2.html';
});

function readTextFile(file, func) {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				func(allText);
			}
		}
	};
	rawFile.send(null);
}

chooseNo.addEventListener('mouseover', function () {
	let wrapWidth = chooseWrap.offsetWidth;
	let wrapHeight = chooseWrap.offsetHeight;

	let buttonWidth = chooseNo.offsetWidth;
	let buttonHeight = chooseNo.offsetHeight;

	const randWidth = wrapWidth - buttonWidth;
	const randHeight = wrapHeight - buttonHeight;

	// this.style.transform = 'translate(-50%, -50%)'
	const point = randPoint(randWidth, randHeight);

	this.style.transform = 'none';
	this.style.top = point.y + 'px';
	this.style.left = point.x + 'px';
});

chooseNo.addEventListener('click', function () {
	let wrapWidth = chooseWrap.offsetWidth;
	let wrapHeight = chooseWrap.offsetHeight;

	let buttonWidth = chooseNo.offsetWidth;
	let buttonHeight = chooseNo.offsetHeight;

	const randWidth = wrapWidth - buttonWidth;
	const randHeight = wrapHeight - buttonHeight;

	// this.style.transform = 'translate(-50%, -50%)'
	const point = randPoint(randWidth, randHeight);

	this.style.transform = 'none';
	this.style.top = point.y + 'px';
	this.style.left = point.x + 'px';
});

chooseNo.addEventListener('mousemove', function () {
	let wrapWidth = chooseWrap.offsetWidth;
	let wrapHeight = chooseWrap.offsetHeight;

	let buttonWidth = chooseNo.offsetWidth;
	let buttonHeight = chooseNo.offsetHeight;

	const randWidth = wrapWidth - buttonWidth;
	const randHeight = wrapHeight - buttonHeight;

	// this.style.transform = 'translate(-50%, -50%)'
	const point = randPoint(randWidth, randHeight);

	this.style.transform = 'none';
	this.style.top = point.y + 'px';
	this.style.left = point.x + 'px';
});

const getRndInteger = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

const randPoint = function (width, height) {
	let x = getRndInteger(0, width);
	let y = getRndInteger(0, height);

	while (!pointOk(x, y)) {
		x = getRndInteger(0, width);
		y = getRndInteger(0, height);
	}

	return {
		x,
		y,
	};
};

const pointOk = function (x, y) {
	let check = true;
	if (x >= minX && x <= maxX) check = false;

	if (y >= minY && y <= maxY) check = false;

	return check;
};

// Await first

const btn = document.querySelector('.btn-first');
const audioFileUrl = './public/audio/au1.mp3';

const clickFunc = function () {
	this.classList.add('d-none');

	// Gọi
	awaitGreeting();
	awaitChoose();

	document.querySelector('.container').classList.remove('d-none');

	var context = new (window.AudioContext || window.webkitAudioContext)();
	var xhr = new XMLHttpRequest();
	xhr.open('GET', audioFileUrl);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function () {
		context.decodeAudioData(xhr.response, function (audio) {
			var buffer = context.createBufferSource();
			buffer.connect(context.destination);
			buffer.buffer = audio;
			buffer.start(0);
		});
	};
	xhr.send();

	btn.removeEventListener('click', clickFunc);
};

btn.addEventListener('click', clickFunc);
