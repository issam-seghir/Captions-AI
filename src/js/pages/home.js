import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

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

gsap.from(".ai__desc", {
	// duration: 3 ,
	opacity: 0, // Rotate back to 0 degrees to reveal the screen
	scrollTrigger: {
		trigger: ".ai",
		// pin: true, // pin the trigger element while active
		start: "top top", // when the top of the trigger hits the top of the viewport
		end: "+=1500", // end after scrolling 500px beyond the start
		scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
		markers: true,
	},
});
