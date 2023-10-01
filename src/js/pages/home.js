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

// Create a separate ScrollTrigger for the first timeline
let scrollTrigger1 = {
	trigger: ".ai__main",
	pin: true, // pin the trigger element while active
	// pinSpacing: "margin",
	// pinType: "transform",
	// pinReparent: true,
	// anticipatePin: .2, // may help avoid jump
	start: "top top", // when the top of the trigger hits the top of the viewport
	end: "+=4000", // end after scrolling 2000px beyond the start
	scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// markers: true,
};

let tl = gsap.timeline({
	scrollTrigger: scrollTrigger1,
});

// Create a separate ScrollTrigger for the second timeline
let scrollTrigger2 = {
	trigger: ".edit__grid",
	pin: true, // pin the trigger element while active
	// pinSpacing: "margin",
	// pinType: "transform",
	// pinReparent: true,
	// anticipatePin: .2, // may help avoid jump
	start: "top top", // when the top of the trigger hits the top of the viewport
	end: "4000px", // end after scrolling 2000px beyond the start
	scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// markers: true,
};

let tl2 = gsap.timeline({
	scrollTrigger: scrollTrigger2,
});

//? ai section animation

animation.addEventListener("DOMLoaded", function () {
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

//?  edit section animation

gsap.to(".edit__animate", {
	translateY: (index, element) => element.dataset.y,
	scrollTrigger: {
		trigger: ".edit__grid",
		start: "top bottom", // when the top of the trigger hits the top of the viewport
		end: "bottom top+=20px", // end after scrolling 2000px beyond the start
		scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
		// markers: true,
	},
});

tl2.to(".edit__animate", {
	duration: 2,
	yPercent: -100,

	opacity: 0,
})
	.to(".edit__main", { margin: "-3rem" }, "<")
	.fromTo(".edit__gradiant-blur-img-bottom", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
	.to(".edit__main-img:nth-child(2)", {
		duration: 5,
		opacity: 0,
	})
	.fromTo(".edit__main-desc", { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
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
	.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/asset 44.svg" } })
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
	.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/asset 45.svg" } })
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
	.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/asset 46.svg" } })
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
	.set(".edit__main-desc-icon", { duration: 0.01, attr: { src: "src/assets/svg/asset 47.svg" } })
	.to(".edit__main-desc-title", { duration: 0.01, text: "AI rotoscoping" })
	.to(".edit__main-desc-paragraph", { duration: 0.01, text: "Cut out object with one tap" })
	.fromTo(".edit__main-desc", { autoAlpha: 0 }, { duration: 2, autoAlpha: 1 })
	.fromTo(".edit__progress-bar:nth-child(5)", { height: "100%" }, { duration: 10, height: "35%" });

// sound section animation

// Create a separate ScrollTrigger for the second timeline
let scrollTrigger3 = {
	trigger: ".sound__flex",
	// pin: true, // pin the trigger element while active
	// pinSpacing: "margin",
	// pinType: "transform",
	// pinReparent: true,
	// anticipatePin: .2, // may help avoid jump
	start: "top bottom", // when the top of the trigger hits the top of the viewport
	end: "bottom top", // end after scrolling 2000px beyond the start
	scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// markers: true,
};

let tl3 = gsap.timeline({
	scrollTrigger: scrollTrigger3,
});

tl3.to(".sound__card-img", { translateX: -50 });

// Distribute section animation

// Create a separate ScrollTrigger for the second timeline
let scrollTrigger4 = {
	trigger: ".distribute",
	pin: true, // pin the trigger element while active
	// pinSpacing: "margin",
	pinType: "transform",
	// pinReparent: true,
	// anticipatePin: .2, // may help avoid jump
	start: "top 2.5%", // when the top of the trigger hits the top of the viewport
	end: "4000px", // end after scrolling 2000px beyond the start
	scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// markers: true,
};

let tl4 = gsap.timeline({
	scrollTrigger: scrollTrigger4,
});

// tl3.to(".sound__card-img", {  translateX: -50 })
tl4.fromTo(".distribute__progress-bar:nth-child(1)", { height: "100%" }, { duration: 6, height: "35%" })
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
