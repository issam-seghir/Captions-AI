import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import lottie from "lottie-web";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// lotties animation
// see : https://airbnb.io/lottie/#/web
const lottieContainer = document.querySelector(".ai__mockup-lottie");

console.log();
let playhead = { frame: 0 },
	animation = lottie.loadAnimation({
		container: lottieContainer, // the dom element that will contain the animation
		renderer: "svg", // Use 'svg' as animation format rendered in the container (svg || canvas|| html )
		loop: !!+lottieContainer.dataset.loop, // true/false
		autoplay: !!+lottieContainer.dataset.autoplay, // true/false
		path: lottieContainer.dataset.src, // the path to the animation json
		// name: "Hello World", // Name for future reference.
	});

// Optionally set animation speed and other properties
animation.setSpeed(4); // Adjust the speed if needed

// initialize lenis smooth scrolling
const lenis = new Lenis({
	lerp: 0.07, // animation smoothness (between 0 & 1)
	wheelMultiplier: 0.7, // scrolling speed for mouse wheel
	touchMultiplier: 0.7, // scrolling speed for touch events
	orientation: "vertical", // orientation of the scrolling (vertical/horizontal)
	gestureOrientation: "vertical", // orientation of the gestures (vertical/horizontal)
	normalizeWheel: false, // Normalize wheel inputs
	infinite: false, // infinite scroll
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ------------ Using Gsap ScrollTrigger with lenis  ---------------------
function connectToScrollTrigger() {
	lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add(function (time) {
		lenis.raf(time * 1000);
	});
}
connectToScrollTrigger();

// ai section animation
animation.addEventListener("DOMLoaded", function () {
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".ai__main",
			pin: true, // pin the trigger element while active
			// pinSpacing: "margin",
			pinType: "transform",
			// pinReparent: true,
			// anticipatePin: .2, // may help avoid jump
			start: "top top", // when the top of the trigger hits the top of the viewport
			end: "+=4000", // end after scrolling 2000px beyond the start
			scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
			markers: true,
		},
	});

	// use lotties animation with scrolltrigger
	tl.to(playhead, {
		frame: animation.totalFrames - 1,
		duration: lottieContainer.dataset.duration,
		ease: "none",
		onUpdate: () => animation.goToAndStop(playhead.frame, true),
	})
		.fromTo(".ai__progress-bar:nth-child(1)", { height: "100%" }, { duration: 4, height: "35%" })
		.fromTo(".ai__progress-bar:nth-child(2)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 0.1, autoAlpha: 0 })
		.to(".ai__desc-title", { duration: 0.01, text: "AI Enhance Speech" })
		.to(".ai__desc-paragraph", { duration: 0.01, text: "Automatically remove background noise and enhance speech" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
		.fromTo(".ai__progress-bar:nth-child(2)", { height: "100%" }, { duration: 4, height: "35%" })
		.fromTo(".ai__progress-bar:nth-child(3)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 })
		.to(".ai__desc-title", { duration: 0.01, text: "AI Eye Contact" })
		.to(".ai__desc-paragraph", { duration: 0.01, text: "Correct eye contact to look at the camera in post production" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
		.fromTo(".ai__progress-bar:nth-child(3)", { height: "100%" }, { duration: 4, height: "35%" })
		.fromTo(".ai__progress-bar:nth-child(4)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 })
		.to(".ai__desc-title", { duration: 0.01, text: "AI Speech Correction" })
		.to(".ai__desc-paragraph", { duration: 0.01, text: "Correct any mistakes or in your recorded speech with one tap" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
		.fromTo(".ai__progress-bar:nth-child(4)", { height: "100%" }, { duration: 4, height: "35%" })
		.fromTo(".ai__progress-bar:nth-child(5)", { height: "35%" }, { duration: 4, height: "100%" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 1 }, { duration: 2, autoAlpha: 0 })
		.to(".ai__desc-title", { duration: 0.01, text: "AI Lipdub" })
		.to(".ai__desc-paragraph", { duration: 0.01, text: "Change your lip movement in post production to edit  the content of your speech" }, "<")
		.fromTo(".ai__desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
		.fromTo(".ai__progress-bar:nth-child(5)", { height: "100%" }, { height: "35%" });
});
