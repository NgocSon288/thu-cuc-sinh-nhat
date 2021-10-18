const poemRows = document.querySelectorAll('.poem .poem-paragraph p');
const poemAuthor = document.querySelector('.poem-author');
const btnContinueFirst = document.querySelector('.btn-continue-first');

const time = 2000; // thời gian in một dòng
const delayRowItem = 1000; // Thời gian nghỉ khi in xong 1 dòng
const delayPage = 4000;

poemRows.forEach((item) => {
	item.classList.add('d-none');
});

poemAuthor.classList.add('d-none');

function print() {
	setTimeout(() => {
		for (let i = 0; i < poemRows.length; i++) {
			const item = poemRows[i];
			const text = item.textContent;

			setTimeout(function () {
				item.classList.remove('d-none');
				item.textContent = '';

				const length = text.length;
				const unitTime = time / length;

				for (let j = 0; j < length; j++) {
					setTimeout(function () {
						item.textContent += text[j];
					}, unitTime * j);
				}
			}, i * time + delayRowItem * i);
		}

		setTimeout(function () {
			const item = poemAuthor;
			const text = item.textContent;
			poemAuthor.classList.remove('d-none');

			item.textContent = '';
			const length = text.length;
			const unitTime = time / length;

			for (let j = 0; j < length; j++) {
				setTimeout(function () {
					item.textContent += text[j];
				}, unitTime * j);
			}
		}, (time + delayRowItem) * 12);
	}, 1000);
}

const page2Event = function () {
	btnContinueFirst.removeEventListener('click', page2Event);

	document.querySelector('.first').classList.add('d-none');
	document.querySelector('h1').classList.remove('d-none');
	document.querySelector('.poem').classList.remove('d-none');

	print();

	const audioFileUrl = './public/audio/au2.mp3';

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
};

btnContinueFirst.addEventListener('click', page2Event);

// Continue
const continueSection = document.querySelector('.continue');

setTimeout(() => {
	continueSection.classList.remove('d-none');
}, (time + delayRowItem) * 13 + delayPage);
