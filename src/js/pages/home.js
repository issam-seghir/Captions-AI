import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import lottie from "lottie-web";

// ? ------------  Media queries ------------
const mq = {
	small: "(min-width: 481px)",
	xSmall: "(min-width: 641px)",
	medium: "(min-width: 769px)",
	xMedium: "(min-width: 992px)",
	large: "(min-width: 1025px)",
	xLarge: "(min-width: 1281px)",
	xxLarge: "(min-width: 1537px)",
};

// ? ------------  setup GSAP/Plugins  & Lenis smooth scrolling ------------

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// initialize lenis smooth scrolling
const lenis = new Lenis({
	lerp: 0.07, // animation smoothness (between 0 & 1)
	wheelMultiplier: 0.7, // scrolling speed for mouse wheel
	touchMultiplier: 0.7, // scrolling speed for touch events
	smoothWheel: true, // smooth scrolling for while events
	smoothTouch: true, // smooth scrolling for touche events
	orientation: "vertical", // orientation of the scrolling (vertical/horizontal)
	gestureOrientation: "vertical", // orientation of the gestures (vertical/horizontal)
	normalizeWheel: false, // Normalize wheel inputs
	infinite: false, // infinite scroll
	autoResize: true,
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Using Gsap ScrollTrigger with lenis
function connectToScrollTrigger() {
	lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add(function (time) {
		lenis.raf(time * 1000);
	});
}
connectToScrollTrigger();

// ? ------------  smooth scrolling (Lenis) in anchor links (nav links) ------------

document.querySelectorAll("nav > a").forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		lenis.scrollTo(`${e.target.getAttribute("href")}`, {
			lerp: 0.09,
		});

		// const targetSection = document.querySelector(`${e.target.getAttribute("href")}`);
		// targetSection.scrollIntoView({ behavior: "smooth" });
	});
});

// ? ------------  header animation : hide when scroll down , shown when scroll down  ------------

let didScroll = false;
let lastScrollTop = 0;
const delta = 150; // how much to scroll down to hiding the header
const header = document.querySelector(".wrapper:has(header)");
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
	console.log("you are on mobile");
	// Clear the scroll interval and remove the scroll event listener
	clearInterval(scrollInterval);
}


// ? ------------  nav animation : burger menu  ------------

const burgerMenuButton = document.querySelector(".burger-menu");

burgerMenuButton.addEventListener("click", function () {
	burgerMenuButton.classList.toggle("active");
});

// ? ------------  GSAP on Scroll animations  ------------

// the scroll animation only fires in desktop >= 991px
let xmdG = gsap.matchMedia();
xmdG.add(mq.xMedium, () => {
	// Setup Lottie's animation
	// see : https://airbnb.io/lottie/#/web
	const lottieContainer = document.querySelector(".ai__mockup");

	let playhead = { frame: 0 },
		mockupLottieAnimation = lottie.loadAnimation({
			container: lottieContainer, // the dom element that will contain the animation
			renderer: "svg", // Use 'svg' as animation format rendered in the container (svg || canvas|| html )
			loop: !!+lottieContainer.dataset.loop, // true/false
			autoplay: !!+lottieContainer.dataset.autoplay, // true/false
			path: lottieContainer.dataset.src, // the path to the animation json
			// name: "Hello World", // Name for future reference.
		});

	// Optionally set animation speed and other properties
	lottie.setSpeed(20);

	mockupLottieAnimation.addEventListener("DOMLoaded", function () {
		//! important : scroll triggers must be in order ,
		//! the first section is the one which triggers the first scrollTrigger first  in this code (tlHero)

		let scrollTriggerHero = {
			trigger: ".hero",
			pin: true,
			// pinSpacing: "margin",
			// pinType: "transform",
			// pinReparent: true,
			// anticipatePin: .2, // may help avoid jump
			start: "top 2.5%", // when the top of the trigger hits the top of the viewport
			end: "2000px",
			scrub: 1,
			// markers: true,
		};
		let tlHero = gsap.timeline({
			scrollTrigger: scrollTriggerHero,
		});

		let scrollTriggerAi = {
			trigger: ".ai__main",
			pin: true,
			start: "top top", // when the top of the trigger hits the top of the viewport
			end: "+=4000",
			scrub: 1,
			// markers: true,
		};
		let tlAi = gsap.timeline({
			scrollTrigger: scrollTriggerAi,
		});

		let scrollTriggerEdit = {
			trigger: ".edit__grid",
			pin: true,
			start: "top top", // when the top of the trigger hits the top of the viewport
			end: "4000px",
			scrub: 1,
			// markers: true,
		};
		let tlEdit = gsap.timeline({
			scrollTrigger: scrollTriggerEdit,
		});

		let scrollTriggerSound = {
			trigger: ".sound__flex",
			start: "top bottom", // when the top of the trigger hits the top of the viewport
			end: "bottom top",
			scrub: 1,
			// markers: true,
		};

		let tlSound = gsap.timeline({
			scrollTrigger: scrollTriggerSound,
		});

		let scrollTriggerDistribution = {
			trigger: ".distribute",
			pin: true,
			start: "top 2.5%", // when the top of the trigger hits the top of the viewport
			end: "4000px",
			scrub: 1,
			// markers: true,
		};

		let tlDistribution = gsap.timeline({
			scrollTrigger: scrollTriggerDistribution,
		});

		//?  -------- Hero section animation ------------
		const heroMockupContainer = document.querySelector(".hero__mockup-container");
		tlHero
			.to(heroMockupContainer, { yPercent: "-40", transformOrigin: "center 21%" })
			.to(heroMockupContainer, { scale: 6 })
			.to(".hero__lines", { duration: 0.01, autoAlpha: 0 })
			.to(".hero__mockup", { duration: 0.01, autoAlpha: 0 }, "<")
			.to(".hero__mockup-img", { duration: 0.01, autoAlpha: 0 }, "<")
			.to(heroMockupContainer, { scale: 1 })
			.to(heroMockupContainer, { width: "100%", height: "100%", top: "50%", yPercent: "-50", xPercent: "-50" }, "<")
			.to(".hero__mockup-container video", { top: 0, left: 0, height: "100%", width: "100%", borderRadius: "3rem", ease: "linear" }, "<0.1")
			.to(".hero", { backgroundPosition: "100% 0, 0", backgroundSize: "cover" }, "<")
			.fromTo(".hero__video-desc", { yPercent: "100", autoAlpha: 0 }, { yPercent: "-15", autoAlpha: 1 });

		//?  -------- AI section animation ------------
		// use Lottie's animation with scrolltrigger
		tlAi.to(playhead, {
			frame: mockupLottieAnimation.totalFrames - 1,
			duration: lottieContainer.dataset.duration,
			ease: "none",
			onUpdate: () => {
				mockupLottieAnimation.goToAndStop(playhead.frame, true);
			},
		})
			.to(".ai__progress-bar:nth-child(1)", { duration: 4, height: "35%" })
			.fromTo(".ai__progress-bar:nth-child(2)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 0.1, autoAlpha: 0 })
			.to(".ai__desc-title", { duration: 0.01, text: "AI Enhance Speech" })
			.to(".ai__desc-paragraph", { duration: 0.01, text: "Automatically remove background noise and enhance speech" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".ai__mockup-images img:nth-child(1)", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 }, "<")
			.fromTo(".ai__progress-bar:nth-child(2)", { height: "100%" }, { duration: 4, height: "35%" })
			.fromTo(".ai__progress-bar:nth-child(3)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 })
			.to(".ai__desc-title", { duration: 0.01, text: "AI Eye Contact" })
			.to(".ai__desc-paragraph", { duration: 0.01, text: "Correct eye contact to look at the camera in post production" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".ai__mockup-images img:nth-child(2)", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 }, "<")
			.fromTo(".ai__progress-bar:nth-child(3)", { height: "100%" }, { duration: 4, height: "35%" })
			.fromTo(".ai__progress-bar:nth-child(4)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 })
			.to(".ai__desc-title", { duration: 0.01, text: "AI Speech Correction" })
			.to(".ai__desc-paragraph", { duration: 0.01, text: "Correct any mistakes or in your recorded speech with one tap" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".ai__mockup-images img:nth-child(3)", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 }, "<")
			.fromTo(".ai__progress-bar:nth-child(4)", { height: "100%" }, { duration: 4, height: "35%" })
			.fromTo(".ai__progress-bar:nth-child(5)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 })
			.to(".ai__desc-title", { duration: 0.01, text: "AI Lipdub" })
			.to(".ai__desc-paragraph", { duration: 0.01, text: "Change your lip movement in post production to edit  the content of your speech" }, "<")
			.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".ai__mockup-images img:nth-child(4)", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 }, "<")
			.fromTo(".ai__progress-bar:nth-child(5)", { height: "100%" }, { height: "35%" });

		//?  -------- Edit section animation ------------
		gsap.to(".edit__animate", {
			translateY: (index, element) => element.dataset.y,
			scrollTrigger: {
				trigger: ".edit__grid",
				start: "top bottom",
				end: "bottom top+=20px",
				scrub: 1,
				// markers: true,
			},
		});
		tlEdit
			.to(".edit__animate", {
				duration: 2,
				yPercent: -100,

				opacity: 0,
			})
			.to(".edit__main", { margin: "-3rem", display: "flex" }, "<")
			.fromTo(".edit__shadow-blur-img", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.to(".edit__main-img:nth-child(2)", {
				duration: 5,
				opacity: 0,
			})
			.fromTo(".edit__main-text", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.fromTo(".edit__main-img--right", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.fromTo(".edit__progress-bar:nth-child(1)", { height: "100%" }, { duration: 6, height: "35%" })
			.fromTo(".edit__progress-bar:nth-child(2)", { height: "35%" }, { duration: 6, height: "100%" }, "<")
			.to(".edit__main-img:nth-child(3)", {
				duration: 5,
				opacity: 0,
			})
			.fromTo(".edit__main-desc", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.fromTo(".edit__main-img--right", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.fromTo(".edit__main-img--left", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/edit-icon-2.svg" } })
			.to(".edit__main-desc-title", { duration: 0.01, text: "AI Color Grading" })
			.to(".edit__main-desc-paragraph", { duration: 0.01, text: "Copy the color gradeof any video or generate your own with a prompt" }, "<")
			.fromTo(".edit__main-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".edit__progress-bar:nth-child(2)", { height: "100%" }, { duration: 6, height: "35%" })
			.fromTo(".edit__progress-bar:nth-child(3)", { height: "35%" }, { duration: 6, height: "100%" }, "<")
			.to(".edit__main-img:nth-child(4)", {
				duration: 5,
				opacity: 0,
			})
			.fromTo(".edit__main-desc", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.fromTo(".edit__main-img--right", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.fromTo(".edit__main-img--left", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/edit-icon-3.svg" } })
			.to(".edit__main-desc-title", { duration: 0.01, text: "AI Color Schema" })
			.to(".edit__main-desc-paragraph", { duration: 0.01, text: "Generate the perfect color schema with just a text prompt" })
			.fromTo(".edit__main-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".edit__progress-bar:nth-child(3)", { height: "100%" }, { duration: 6, height: "35%" })
			.fromTo(".edit__progress-bar:nth-child(4)", { height: "35%" }, { duration: 6, height: "100%" }, "<")
			.to(".edit__main-img:nth-child(5)", {
				duration: 5,
				opacity: 0,
			})
			.fromTo(".edit__main-desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 }, "<")
			.fromTo(".edit__main-img--right", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.fromTo(".edit__main-img--left", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/edit-icon-4.svg" } })
			.to(".edit__main-desc-title", { duration: 0.01, text: "AI Background Removal" })
			.to(".edit__main-desc-paragraph", { duration: 0.01, text: "Automatically remove the background of your video " })
			.fromTo(".edit__main-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".edit__progress-bar:nth-child(4)", { height: "100%" }, { duration: 6, height: "35%" })
			.fromTo(".edit__progress-bar:nth-child(5)", { height: "35%" }, { duration: 6, height: "100%" }, "<")
			.to(".edit__main-img:nth-child(6)", {
				duration: 5,
				opacity: 0,
			})
			.fromTo(".edit__main-desc", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.fromTo(".edit__main-img--right", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
			.fromTo(".edit__main-img--left", { autoAlpha: 1 }, { autoAlpha: 0 }, "<")
			.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/edit-icon-5.svg" } })
			.to(".edit__main-desc-title", { duration: 0.01, text: "AI rotoscoping" })
			.to(".edit__main-desc-paragraph", { duration: 0.01, text: "Cut out object with one tap" })
			.fromTo(".edit__main-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".edit__progress-bar:nth-child(5)", { height: "100%" }, { duration: 10, height: "35%" });

		//?  -------- Sound section animation ------------
		tlSound.to(".sound__card-img", { translateX: -50 });

		//?  -------- Distribute section animation ------------
		// tl3.to(".sound__card-img", {  translateX: -50 })
		tlDistribution
			.fromTo(".distribute__progress-bar:nth-child(1)", { height: "100%" }, { duration: 6, height: "35%" })
			.fromTo(".distribute__progress-bar:nth-child(2)", { height: "75%" }, { duration: 6, height: "100%" }, "<")
			.fromTo(".distribute__progress-bar:nth-child(3)", { height: "50%" }, { duration: 6, height: "80%" }, "<")
			.fromTo(".distribute__video:nth-child(1)", { autoAlpha: 1 }, { duration: 6, autoAlpha: 0 })
			.fromTo(".distribute__item-desc", { autoAlpha: 1 }, { duration: 6, autoAlpha: 0 }, "<")
			.to(".distribute__item-desc-title", { duration: 0.01, text: "AI Dubbing" })
			.to(".distribute__item-desc-paragraph", { duration: 0.01, text: "Dub your video into any language while maintaining your voice" }, "<")
			.fromTo(".distribute__item-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".distribute__progress-bar:nth-child(2)", { height: "100%" }, { duration: 6, height: "35%" })
			.fromTo(".distribute__progress-bar:nth-child(3)", { height: "80%" }, { duration: 6, height: "35%" }, "<")
			.fromTo(".distribute__progress-bar:nth-child(4)", { height: "35%" }, { duration: 6, height: "100%" })
			.fromTo(".distribute__progress-bar:nth-child(5)", { height: "35%" }, { duration: 6, height: "75%" }, "<")
			.fromTo(".distribute__video:nth-child(2)", { autoAlpha: 1 }, { duration: 6, autoAlpha: 0 })
			.fromTo(".distribute__item-desc", { autoAlpha: 1 }, { duration: 6, autoAlpha: 0 }, "<")
			.to(".distribute__item-desc-title", { duration: 0.01, text: "AI Extract Clips" })
			.to(".distribute__item-desc-paragraph", { duration: 0.01, text: "Automatically extract interesting and viral worthy short clips from longer video provided" }, "<")
			.fromTo(".distribute__item-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
			.fromTo(".distribute__progress-bar:nth-child(4)", { height: "100%" }, { height: "35%" })
			.fromTo(".distribute__progress-bar:nth-child(5)", { height: "75%" }, { height: "35%" }, "<");
	});
});
