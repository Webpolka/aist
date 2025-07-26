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

/*------------------------------------------------------------------------------------------------------------------------
REVIEWS BLOCK 6 SWIPER SLIDER
--------------------------------------------------------------------------------------------------------------------------*/
const swiper = new Swiper(".swiper-container", {
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
