// Background  banner
const banner = document.getElementsByClassName('banner')[0];
const blocks = document.getElementsByClassName('blocks');

for (let i = 1; i < 400; i++) {
	banner.innerHTML += '<div class="blocks"></div>';
	blocks[i].style.animationDelay = `${i * 0.025}s`;
}

// Thời gian đợi show hình
const awaitTimeGreeting = 2000; // 13000
const offsetTime = 5; // 5

// Greeting
const greeting = document.getElementsByClassName('greetingClass')[0];
const greetingItems = document.querySelectorAll('.greetingClass p');

greetingItems.forEach((item, i) => {
	item.style.animationDelay = offsetTime * i + 0.25 + 's';
});

const awaitGreeting = function () {
	setTimeout(() => {
		greeting.classList.add('greeting');
	}, awaitTimeGreeting);

	setTimeout(() => {
		greetingItems.forEach((item, i) => {
			item.style.display = 'block';
		});
	}, awaitTimeGreeting - 500);
};
