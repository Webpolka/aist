import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();
/*---------------------------------------------------------------------------------------------------------------
Transfer elements in header
----------------------------------------------------------------------------------------------------------------*/
import TransferElements from "./modules/transfer";

const transferPhone = document.getElementById("logo");
const transferPlaceLogo = document.getElementById("logo-transfer-place");

const transferOptions = document.getElementById("options-button");
const transferPlaceOptions = document.getElementById("options-transfer-place");

if (transferPhone && transferPlaceLogo) {
	new TransferElements({
		sourceElement: transferPhone,
		breakpoints: {
			576: {
				targetElement: transferPlaceLogo,
			},
		},
	});
}
if (transferOptions && transferPlaceOptions) {
	new TransferElements({
		sourceElement: transferOptions,
		breakpoints: {
			576: {
				targetElement: transferPlaceOptions,
			},
		},
	});
}

/*---------------------------------------------------------------------------------------------------------------
Transfer elements helps sections
----------------------------------------------------------------------------------------------------------------*/
const transferHelps1 = document.getElementById("helps-item-1");
const transferForHelps1 = document.getElementById("for-sm-item-1");

const transferHelps2 = document.getElementById("helps-item-2");
const transferForHelps2 = document.getElementById("for-sm-item-2");

if (transferHelps1 && transferForHelps1) {
	new TransferElements({
		sourceElement: transferHelps1,
		breakpoints: {
			768: {
				targetElement: transferForHelps1,
				targetPosition: 1,
			},
		},
	});
}
if (transferHelps2 && transferForHelps2) {
	new TransferElements({
		sourceElement: transferHelps2,
		breakpoints: {
			768: {
				targetElement: transferForHelps2,
			},
		},
	});
}

/*------------------------------------------------------------------------------------------------------------------------
REVIEWS BLOCK 6 SWIPER SLIDER
--------------------------------------------------------------------------------------------------------------------------*/
const swiper = document.querySelector('.swiper-container');
swiper && new Swiper(swiper, {
	slidesPerView: 3,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
		},
		640: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
	},
});

/*------------------------------------------------------------------------------------------------------------------------
HOW MUCH IT COAST TABS AND FORM PREVENT DEFAULT
--------------------------------------------------------------------------------------------------------------------------*/
import AistTabs from "./modules/tabs";

window.addEventListener("DOMContentLoaded", function () {
	const aistTabs = document.querySelector("[data-tab]");
	aistTabs &&
		new AistTabs({
			button: "data-tab",
			panel: "data-panel",
			form: "#rate-form",
			input: "#rate-input",
			index: 0,
		});
});
