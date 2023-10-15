/* eslint-disable security/detect-object-injection */
import gsap from "gsap";
import lottie from "lottie-web";

import mq from "./mediaQuery";

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
			end: "4000px",
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
		const hero = document.querySelector(".hero");
		const heroMockupContainer = document.querySelector(".hero__mockup-container");
		const heroLines = document.querySelector(".hero__lines");
		const heroMockup = document.querySelector(".hero__mockup");
		const heroMockupImg = document.querySelector(".hero__mockup-img");
		const heroMockupVideo = document.querySelector(".hero__mockup-container video");
		const heroVideoDesc = document.querySelector(".hero__video-desc");

		tlHero
			.to(heroMockupContainer, { yPercent: "-40", transformOrigin: "center 21%" })
			.to(heroMockupContainer, { scale: 6 })
			.to([heroLines, heroMockup, heroMockupImg], { autoAlpha: 0 })
			.to(heroMockupContainer, { scale: 1 })
			.to(heroMockupContainer, { width: "100%", height: "100%", top: "50%", yPercent: "-50", xPercent: "-50" }, "<")
			.to(heroMockupVideo, { top: 0, left: 0, height: "100%", width: "100%", borderRadius: "3rem", ease: "linear" }, "<")
			.to(hero, { backgroundPosition: "100% 0, 0", backgroundSize: "cover" }, "<")
			.fromTo(heroVideoDesc, { yPercent: "100", autoAlpha: 0 }, { yPercent: "-15", autoAlpha: 1 });

		//?  -------- AI section animation ------------

		//  select elements
		const descContentAi = [
			{
				title: "AI Enhance Speech",
				paragraph: "Automatically remove background noise and enhance speech",
			},
			{
				title: "AI Eye Contact",
				paragraph: "Correct eye contact to look at the camera in post production",
			},
			{
				title: "AI Speech Correction",
				paragraph: "Correct any mistakes in your recorded speech with one tap",
			},
			{
				title: "AI Lipdub",
				paragraph: "Change your lip movement in post production to edit the content of your speech",
			},
		];
		const progressBarsAi = document.querySelectorAll(".ai__progress-bar");
		const mockupImagesAi = document.querySelectorAll(".ai__mockup-images img");
		const descAi = document.querySelectorAll(".ai__desc");
		const descTitleAi = document.querySelectorAll(".ai__desc-title");
		const descParagraphAi = document.querySelectorAll(".ai__desc-paragraph");

		// use Lottie's animation with scrolltrigger
		tlAi.to(playhead, {
			frame: mockupLottieAnimation.totalFrames - 1,
			duration: lottieContainer.dataset.duration,
			ease: "none",
			onUpdate: () => {
				mockupLottieAnimation.goToAndStop(playhead.frame, true);
			},
		});
		descContentAi.forEach(({ title, paragraph }, index) => {
			tlAi.to(progressBarsAi[index], { duration: 4, scaleY: 1 })
				.to(progressBarsAi[index + 1], { duration: 4, scaleY: 2.8 }, "<")
				.to(descAi, { duration: 0.1, autoAlpha: 0 })
				.to(descTitleAi, { duration: 0.01, text: title })
				.to(descParagraphAi, { duration: 0.01, text: paragraph }, "<")
				.to(descAi, { duration: 2, autoAlpha: 1 })
				.from(mockupImagesAi[index], { duration: 2, autoAlpha: 0 }, "<");
		});

		// scaleY of the last progress bar
		tlAi.to(progressBarsAi, {duration: 12, scaleY: 1 });

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

		//  select elements
		const descContentEdit = [
			{
				title: "AI Color Grading",
				paragraph: "Copy the color gradeof any video or generate your own with a prompt",
				src: "src/assets/svg/edit-icon-2.svg",
			},
			{
				title: "AI Color Schema",
				paragraph: "Generate the perfect color schema with just a text prompt",
				src: "src/assets/svg/edit-icon-3.svg",
			},
			{
				title: "AI Background Removal",
				paragraph: "Automatically remove the background of your video ",
				src: "src/assets/svg/edit-icon-4.svg",
			},
			{
				title: "AI rotoscoping",
				paragraph: "Cut out object with one tap",
				src: "src/assets/svg/edit-icon-5.svg",
			},
		];
		const progressBarsEdit = document.querySelectorAll(".edit__progress-bar");
		const imagesEdit = document.querySelectorAll(".edit__main-img");
		const imagesMiniEdit = document.querySelectorAll(".edit__main-img-mini");
		const descEdit = document.querySelector(".edit__main-desc");
		const descTitleEdit = document.querySelector(".edit__main-desc-title");
		const descParagraphEdit = document.querySelector(".edit__main-desc-paragraph");
		const descIconEdit = document.querySelector(".edit__main-desc-icon");
		// hide all mini images
		tlEdit.set(imagesMiniEdit, { autoAlpha: 0 });


		// the first element animation
		tlEdit
			.to(".edit__animate", {
				duration: 2,
				yPercent: -100,

				autoAlpha: 0,
			})
			.to(".edit__main", { margin: "-3rem", display: "flex" }, "<")
			.from(".edit__shadow-blur-img", { autoAlpha: 0 }, "<")
			.to(imagesEdit[0], {
				duration: 5,
				autoAlpha: 0,
			})
			.from(".edit__main-text", { autoAlpha: 0 }, "<")
			.to(imagesMiniEdit[0], { autoAlpha: 1 }, "<");

		descContentEdit.forEach(({ title, paragraph, src }, index) => {
			tlEdit
				.to(progressBarsEdit[index], { duration: 6, scaleY: 1 })
				.to(progressBarsEdit[index + 1], { duration: 6, scaleY: 2.8 }, "<")
				.to(imagesEdit[index + 1], { duration: 5, autoAlpha: 0 })
				.to(descEdit, { autoAlpha: 0 }, "<")
				.to(imagesMiniEdit[index], { autoAlpha: 0 }, "<")
				.to(imagesMiniEdit[index+1], { autoAlpha: 1 }, "<")
				.set(descIconEdit, { duration: 0.01, attr: { src: src } })
				.to(descTitleEdit, { duration: 0.01, text: title })
				.to(descParagraphEdit, { duration: 0.01, text: paragraph }, "<")
				.to(descEdit, { duration: 2, autoAlpha: 1 });
		});

		// scaleY of the last progress bar
		tlEdit.to(progressBarsEdit, { duration: 12, scaleY: 1 });


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
