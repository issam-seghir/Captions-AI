import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
	//wrapper : ..., // scroll container , (default window)
	// smoothTouch : true, // enable smooth scrolling for touch events
	lerp: 0.07, // between 0 & 1
	wheelMultiplier: 0.7, // multiplier to use for mouse wheel events
	touchMultiplier: 0.7, // multiplier to use for touch events
	orientation: "vertical", // orientation of the scrolling (vertical/horizontal)
	gestureOrientation: "vertical", // orientation of the gestures (vertical/horizontal)
	normalizeWheel: false, // Normalize wheel inputs
	infinite: true, // infinite scroll
});

lenis.on("scroll", (e) => {
	//? Properties
	console.log(e);
	console.log("scroll", e.scroll); // Current scroll value + handle infinite scrolling
	console.log("actualScroll", e.actualScroll); // Current scroll value (by the browser) + handle infinite scrolling
	console.log("animated scroll", e.animatedScroll); // Current scroll value
	console.log("target", e.targetScroll); // Target scroll value

	// logic
	console.log("isHorizontal", e.isHorizontal);
	console.log("scroll is being animated ?", e.isScrolling); // scroll is being animated ?
	console.log(" scroll is animated", e.isSmooth); // scroll is animated ?
	console.log("user should be able to scroll", e.isStopped); // user should be able to scroll ?

	console.log(`progress 🦄 : ${e.progress * 100}`); // from the top to the bottom (0-1)
	console.log(`limit : ${e.limit}`); // max scroll value (the end of the scroll container) === max value of (targetScroll || actualScroll || animatedScroll)

	// direction of the scrollbar  : `0`: stopped, `1`: scrolling up, `-1`: scrolling down
	console.log(`direction :${e.direction === -1 ? "scrolling down" : e.direction === 1 ? "scrolling up" : "stopped"}`);

	// current config (options)
	console.log(e.options);
	// dimensions
	const { width, height, scrollWidth, scrollHeight } = e.dimensions;
	console.log(`Wrapper Dimensions : ${width}w x ${height}h`);
	console.log(`scroll Dimensions : ${scrollWidth}w x ${scrollHeight}h`);

	//? Methods
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
// Uncomment this if using GSAP ScrollTrigger
connectToScrollTrigger();

// ai section animation

// gsap.to(".ai__mockup-img", {
// 	duration: 3,
// 	rotationY: 360, // Rotate back to 0 degrees to reveal the screen
// 	svgOrigin: "left left", // Set the transform origin to the left edge
// 	scrollTrigger: {
// 		trigger: ".ai",
// 		// pin: true, // pin the trigger element while active
// 		start: "top top", // when the top of the trigger hits the top of the viewport
// 		// end: "+=1", // end after scrolling 500px beyond the start
// 		scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
// 		markers: true,
// 	},
// });
