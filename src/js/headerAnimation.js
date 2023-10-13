
import mq from "./mediaQuery";

// ? ------------  header animation : hide when scroll down , shown when scroll down  ------------

let didScroll = false;
let lastScrollTop = 0;
const delta = 150; // how much to scroll down to hiding the header
const header = document.querySelector(".wrapper.header");
const navbarHeight = header.offsetHeight;
let scrollInterval; // Store the interval ID

function hasScrolled() {
	const st = window.scrollY;

	// Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - st) <= delta) return;

	// If they scrolled down and are past the navbar, hide the navbar.
	if (st > lastScrollTop && st > navbarHeight) {
		// Scroll Down
		header.style.transform = "translate(0, -100%)";
	} else if (st + window.innerHeight < document.documentElement.scrollHeight) {
		// Scroll Up
		header.style.transform = "translate(0, 0)";
	}

	lastScrollTop = st;
}

//  deactive header scrolling animation in tablet / mobile
const xmd = window.matchMedia(mq.xMedium);

if (xmd.matches) {
	console.log(xmd);
	console.log("you are on desktop");
	window.addEventListener("scroll", () => {
		didScroll = true;
	});

	scrollInterval = setInterval(() => {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);
} else {
	// The media query no longer matches (on mobile)
	console.log("you are on tablet/mobile");
	// Clear the scroll interval and remove the scroll event listener
	clearInterval(scrollInterval);
}

// ? ------------  nav animation : burger menu  ------------

const burgerMenuButton = document.querySelector(".burger-menu");

burgerMenuButton.addEventListener("click", function () {
	burgerMenuButton.classList.toggle("active");
});
