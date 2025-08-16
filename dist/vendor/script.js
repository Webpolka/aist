//swiper library connected in header form CDN

/*---------------------------------------------------------------------------------------------------------------------
BUKA MODAL
----------------------------------------------------------------------------------------------------------------------*/
// document.addEventListener("DOMContentLoaded", function(){
//   var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
//   console.log(scrollbar);
//   document.querySelector('[href="#openModal"]').addEventListener('click',function(){
//     document.body.style.overflow = 'hidden';
//     document.querySelector('#openModal').style.marginLeft = scrollbar;
//   });
//   document.querySelector('[href="#close"]').addEventListener('click',function(){
//     document.body.style.overflow = 'visible';
//     document.querySelector('#openModal').style.marginLeft = '0px';
//   });
// });

/*---------------------------------------------------------------------------------------------------------------------
MONSTERS PARK ADAPTIVE TEXT
----------------------------------------------------------------------------------------------------------------------*/
class ContainerViewportAdaptiveText {
	constructor(el, options) {
		this.element = el;

		const defaultConfig = {
			parent: "",
			desktop: {},
			lg: {},
			md: {},
			sm: {},
			mobile: {},
		};
		this.options = Object.assign(defaultConfig, options);

		this.onResize = this.onResize.bind(this);
		window.addEventListener("resize", this.onResize);
		this.onResize();

		console.log(this.options);
	}
	onResize() {
		const desktop = window.matchMedia("(min-width: 993px)");
		const lg = window.matchMedia("(max-width: 992px)");
		const md = window.matchMedia("(max-width: 768px)");
		const sm = window.matchMedia("(max-width: 576px)");
		const mobile = window.matchMedia("(max-width: 440px)");

		if (desktop.matches && Object.keys(this.options.desktop).length > 0) {
			this.cqw(this.options.desktop);
		}
		if (lg.matches && Object.keys(this.options.lg).length > 0) {
			this.cqw(this.options.lg);
		}
		if (md.matches && Object.keys(this.options.md).length > 0) {
			this.cqw(this.options.md);
		}
		if (sm.matches && Object.keys(this.options.sm).length > 0) {
			this.cqw(this.options.sm);
		}
		if (mobile.matches && Object.keys(this.options.mobile).length > 0) {
			this.cqw(this.options.mobile);
		}
	}

	cqw(args) {
		// styling, min, cqw, max) {
		let width = this.element.closest(this.options.parent).offsetWidth;
		let value = Math.max(args.min, Math.min((width / 100) * args.cqw, args.max));
		this.element.style.setProperty(args.styling, value + "px");
	}
}

const AdaptiveMonsterTiltes = document.querySelectorAll(".monsters-card_title h2");
const AdaptiveMonsterDescriptions = document.querySelectorAll(".monsters-card_description p");

// Отслеживаем адаптив заголовков
AdaptiveMonsterTiltes.forEach((titleElement) => {
	new ContainerViewportAdaptiveText(titleElement, {
		parent: ".monsters-park",
		desktop: {
			styling: "font-size",
			min: 18,
			cqw: 1.9,
			max: 22,
		},
		lg: {
			styling: "font-size",
			min: 14,
			cqw: 1.9,
			max: 18,
		},
		md: {
			styling: "font-size",
			min: 20,
			cqw: 1.9,
			max: 24,
		},
		sm: {
			styling: "font-size",
			min: 18,
			cqw: 5,
			max: 26,
		}	
	});
});

// Отслеживаем адаптив описаний
AdaptiveMonsterDescriptions.forEach((descElement) => {
	new ContainerViewportAdaptiveText(descElement, {
		parent: ".monsters-park",
		desktop: {
			styling: "font-size",
			min: 18,
			cqw: 1.7,
			max: 26,
		},
		lg: {
			styling: "font-size",
			min: 17,
			cqw: 1.9,
			max: 22,
		},
		md: {
			styling: "font-size",
			min: 16,
			cqw: 3,
			max: 26,
		},
		sm: {
			styling: "font-size",
			min: 16,
			cqw: 5,
			max: 24,
		}	
	});
});

/*---------------------------------------------------------------------------------------------------------------------
AIST CUSTOM TABS
----------------------------------------------------------------------------------------------------------------------*/
class AistTabs {
	messageFlag = false;

	constructor(options = {}) {
		// Дефолтная конфигурация
		const defaultConfig = {
			button: "data-tab",
			panel: "data-panel",
			form: "#rate-form",
			input: "#rate-input",
			index: 0,
		};

		this.options = Object.assign(defaultConfig, options);

		this.buttons = document.querySelectorAll(`[${this.options.button}]`);
		this.panels = document.querySelectorAll(`[${this.options.panel}]`);

		this.form = document.querySelector(this.options.form);
		this.input = document.querySelector(this.options.input);

		this.listener();
	}
	// Отслеживание нажатий на кнопки
	listener() {
		this.showTab(this.searchId(this.options.index));
		this.buttons.forEach((btn) => {
			btn.addEventListener("click", (e) => this.tabsChanger(e));
		});
		this.formSubmit();
	}
	// Находим Id для вкладки
	searchId(index) {
		const PL = this.panels.length;
		if (index <= PL - 1) {
			return this.panels[index].getAttribute(`${this.options.panel}`);
		} else {
			return this.panels[0].getAttribute(`${this.options.panel}`);
		}
	}
	// Находим вкладку которую нужно показать
	tabsChanger(e) {
		const tabId = e.currentTarget.getAttribute(`${this.options.button}`);
		this.showTab(tabId);
	}
	showTab(tabId) {
		// 1. Деактивируем все кнопки
		this.buttons.forEach((button) => button.classList.remove("is-active"));

		// 2. Скрываем все вкладки
		this.panels.forEach((panel) => panel.classList.remove("is-active"));

		// 3. Активируем нужную кнопку
		this.buttons.forEach((btn) => {
			if (btn.getAttribute(`${this.options.button}`) == tabId) {
				btn.classList.add("is-active");
				this.addValueToInput(btn);
			}
		});
		// 4. Показываем нужную вкладку
		this.panels.forEach((panel) => {
			if (panel.getAttribute(`${this.options.panel}`) == tabId) {
				panel.classList.add("is-active");
			}
		});
	}
	addValueToInput(btn) {
		const currentValue = btn.querySelector("strong").textContent.trim();
		this.input.value = currentValue;
	}

	formSubmit() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault(); // отменяем стандартное поведение формы
			const data = {
				rate: this.input.value,
			};
			// this.screenMessage("Отправка прервана в JavaScript вызван метод preventDefault() в модуле tabs.js", 1500);
			console.log("Данные формы:", data);
		});
	}

	screenMessage(content, delay) {
		if (!this.messageFlag) {
			let element = document.createElement("div");
			let body = document.querySelector("body");
			body.append(element);
			element.innerHTML = content;
			element.className = "screen-message";
			element.classList.add("active");
			this.messageFlag = true;

			setTimeout(() => {
				element.classList.remove("active");
			}, delay);
			setTimeout(() => {
				element.remove();
				this.messageFlag = false;
			}, delay + 1000);
		}
	}
}
// Init
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

/*---------------------------------------------------------------------------------------------------------------------
COOKIES
----------------------------------------------------------------------------------------------------------------------*/
// checkCookies('http://твоя-ссылка-на-страницу-политики-конфендиальности.com');

function checkCookies(link) {
	addToDOM(link);
	let cookieNote = document.querySelector(".cookies-popup-ht15zxx");
	let cookieBtnAccept = cookieNote.querySelector(".cookies-popup__btn-ht15zxx");

	// Если куки cookies_policy нет или она просрочена, то показываем уведомление
	if (!getCookie("cookies_policy")) {
		cookieNote.classList.add("cookies-popup_show-ht15zxx");
	}

	// При клике на кнопку устанавливаем куку cookies_policy на один год
	cookieBtnAccept.addEventListener("click", function () {
		setCookie("cookies_policy", "true", 365);
		cookieNote.classList.remove("cookies-popup_show-ht15zxx");
	});
}

function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function addToDOM(link) {
	const html = `
        <div class="cookies-popup-ht15zxx">
			<div class="cookies-popup__wrapper-ht15zxx">
				<p class="cookies-popup__content-ht15zxx">
					Мы используем файлы соокіе для улучшения работы сайта. Продолжая использовать сайт, вы даёте согласие на обработку
					файлов соокіе в соответствии с Федеральным законом N°152-Ф3 «O персональных данных». Подробнее о правилах обработки в
					<a href="${link}" target="_blank">Политике обработки персональных данных</a>.
				</p>
				<button class="cookies-popup__btn-ht15zxx">Ок</button>
			</div>
		</div>
    `;
	document.documentElement.insertAdjacentHTML("beforeend", html);
}

/*---------------------------------------------------------------------------------------------------------------------
SWIPER SLIDER INIT
----------------------------------------------------------------------------------------------------------------------*/

const swiper = document.querySelector(".swiper-container");
swiper &&
	new Swiper(swiper, {
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

/*---------------------------------------------------------------------------------------------------------------------
CLASS FOR TRANSFER DOM ELEMENTS IN ADAPTIVE
----------------------------------------------------------------------------------------------------------------------*/

class TransferElements {
	constructor(...objectsWithParameters) {
		if (objectsWithParameters.length === 0) {
			throw TypeError("at least one object with parameters must be specified for the constructor");
		}

		const sourceElements = [];

		const validatedObjectsWithParameters = objectsWithParameters.map((objectWithParameters) => {
			if (this.#getObjectType(objectWithParameters) !== "[object Object]") {
				throw TypeError(`the arguments specified for the constructor must be objects of type 'Object'`);
			}

			["sourceElement", "breakpoints"].forEach((parameterKey) => {
				if (!Object.hasOwn(objectWithParameters, parameterKey)) {
					throw TypeError(`the '${parameterKey}' parameter is not specified for the main object`);
				}
			});

			const { sourceElement, breakpoints } = objectWithParameters;

			if (!(sourceElement instanceof Element)) {
				throw TypeError(`the value specified for the 'sourceElement' parameter must be an object of type 'Element'`);
			}

			if (sourceElements.includes(sourceElement)) {
				throw TypeError(
					`there can only be one object in the constructor with such a 'sourceElement': '${sourceElement.cloneNode().outerHTML}'`
				);
			}

			sourceElements.push(sourceElement);

			objectWithParameters.breakpoints = this.#assembleBreakpoints(breakpoints, sourceElement);

			return objectWithParameters;
		});

		const sortedBreakpointTriggers = [
			...validatedObjectsWithParameters
				.reduce(
					(collection, { breakpoints }) => {
						Object.keys(breakpoints).forEach((breakpointTrigger) => {
							if (Number(breakpointTrigger)) {
								collection.add(breakpointTrigger);
							}
						});

						return collection;
					},

					new Set()
				)
				.add("default"),
		].sort((a, b) => a - b);

		const storageOfBreakpoints = sortedBreakpointTriggers.reduce(
			(storage, breakpointTrigger) => {
				storage.set(breakpointTrigger, []);

				return storage;
			},

			new Map()
		);

		validatedObjectsWithParameters.forEach(({ sourceElement, breakpoints }) => {
			Object.entries(breakpoints).forEach(([breakpointTrigger, { targetElement, targetPosition }]) => {
				storageOfBreakpoints.get(breakpointTrigger).push({
					sourceElement,
					targetElement,
					targetPosition,
				});
			});
		});

		storageOfBreakpoints.forEach((breakpointObjects) => {
			this.#sortBreakpointObjects(breakpointObjects);

			this.#removeSourceElements(breakpointObjects);
			this.#insertSourceElements(breakpointObjects, true);

			breakpointObjects.length = 0;

			sourceElements.forEach((sourceElement) => {
				breakpointObjects.push(this.#generateBreakpointObject(sourceElement, true));
			});

			this.#sortBreakpointObjects(breakpointObjects);
		});

		let previousBreakpointTrigger = "default";

		const resizeObserver = new ResizeObserver(
			([
				{
					borderBoxSize: [{ inlineSize }],
					target,
				},
			]) => {
				const currentWidth = inlineSize + this.#getScrollbarWidth(target);

				const currentBreakpointTrigger = this.#getBreakpointTrigger(sortedBreakpointTriggers, currentWidth);

				if (previousBreakpointTrigger !== currentBreakpointTrigger) {
					const breakpointObjects = storageOfBreakpoints.get(currentBreakpointTrigger);

					this.#removeSourceElements(breakpointObjects);
					this.#insertSourceElements(breakpointObjects, false);

					previousBreakpointTrigger = currentBreakpointTrigger;
				}
			}
		);

		resizeObserver.observe(document.documentElement);
	}

	#assembleBreakpoints(breakpoints, sourceElement) {
		if (this.#getObjectType(breakpoints) !== "[object Object]") {
			throw TypeError(`the value specified for the 'breakpoints' parameter must be an object of type 'Object'`);
		}

		const breakpointEntries = Object.entries(breakpoints);

		if (breakpointEntries.length === 0) {
			throw TypeError(`at least one breakpoint must be specified for the 'breakpoints' object`);
		}

		const validatedBreakpoints = Object.fromEntries(
			breakpointEntries.map(([breakpointTrigger, breakpointObject]) => {
				const breakpointTriggerAsNumber = Number(breakpointTrigger);

				if (!breakpointTriggerAsNumber || breakpointTriggerAsNumber <= 0 || breakpointTriggerAsNumber > Number.MAX_SAFE_INTEGER) {
					throw RangeError(`the breakpoint trigger must be a safe (integer or fractional) number greater than zero`);
				}

				if (this.#getObjectType(breakpointObject) !== "[object Object]") {
					throw TypeError(`the breakpoint object must be of type 'Object'`);
				}

				if (!Object.hasOwn(breakpointObject, "targetElement")) {
					throw TypeError(`the 'targetElement' parameter is not specified for the breakpoint object`);
				}

				const { targetElement, targetPosition } = breakpointObject;

				if (!(targetElement instanceof Element)) {
					throw TypeError(`the value specified for the 'targetElement' parameter must be an object of type 'Element'`);
				}

				if (sourceElement === targetElement) {
					throw TypeError(
						`the value specified for the 'targetElement' parameter must be different from the value specified for the 'sourceElement' parameter`
					);
				}

				if (this.#isTargetElementDescendantOfSourceElement(targetElement, sourceElement)) {
					throw TypeError(
						`the element that is specified as the value for the 'targetElement' parameter must not be a descendant of the element specified as the value for the 'sourceElement' parameter`
					);
				}

				if (this.#isTagOfTargetElementSelfClosing(targetElement)) {
					throw TypeError(`the element specified as the value for the 'targetElement' parameter must be a paired tag`);
				}

				if (Object.hasOwn(breakpointObject, "targetPosition")) {
					if (typeof targetPosition !== "number") {
						throw TypeError(`the value specified for the 'targetPosition' parameter must be of type 'number'`);
					}

					if (targetPosition < 0 || !Number.isSafeInteger(targetPosition)) {
						throw RangeError(
							`the number specified as the value for the 'targetPosition' parameter must be a non-negative safe integer`
						);
					}
				}

				return [
					breakpointTriggerAsNumber,
					{
						targetPosition: targetPosition ?? 0,

						...breakpointObject,
					},
				];
			})
		);

		validatedBreakpoints.default = this.#generateBreakpointObject(sourceElement, false);

		return validatedBreakpoints;
	}

	#getChildElementsOfTargetElement(targetElement) {
		return targetElement.children;
	}

	#getBreakpointTrigger(breakpointTriggers, currentWidth) {
		let startIndex = 0;
		let endIndex = breakpointTriggers.length - 2;
		let savedBreakpointTrigger;

		while (startIndex <= endIndex) {
			const middleIndex = Math.floor((startIndex + endIndex) / 2);
			const guessedBreakpointTrigger = breakpointTriggers[middleIndex];

			if (guessedBreakpointTrigger == currentWidth) {
				return guessedBreakpointTrigger;
			} else if (guessedBreakpointTrigger > currentWidth) {
				endIndex = middleIndex - 1;
			} else {
				startIndex = middleIndex + 1;
			}

			if (guessedBreakpointTrigger - currentWidth > 0) {
				savedBreakpointTrigger = guessedBreakpointTrigger;
			}
		}

		return savedBreakpointTrigger ?? "default";
	}

	#getScrollbarWidth(observableElement) {
		const viewportWidth = window.innerWidth;
		const widthOfObservableElement = Math.min(observableElement.clientWidth, observableElement.offsetWidth);

		let scrollbarWidth = 0;

		if (widthOfObservableElement !== viewportWidth) {
			scrollbarWidth += viewportWidth - widthOfObservableElement;
		}

		return scrollbarWidth;
	}

	#getObjectType(object) {
		return Object.prototype.toString.call(object);
	}

	#isTargetElementDescendantOfSourceElement(targetElement, sourceElement) {
		while ((targetElement = targetElement.parentElement)) {
			if (targetElement === sourceElement) {
				return true;
			}
		}

		return false;
	}

	#isTagOfTargetElementSelfClosing(targetElement) {
		return !new RegExp(/<\/[a-zA-Z]+>$/).test(targetElement.outerHTML);
	}

	#sortBreakpointObjects(breakpointObjects) {
		if (breakpointObjects.length > 1) {
			breakpointObjects.sort((a, b) => a.targetPosition - b.targetPosition);
		}
	}

	#removeSourceElements(breakpointObjects) {
		breakpointObjects.forEach(({ sourceElement }) => {
			sourceElement.remove();
		});
	}

	#insertSourceElements(breakpointObjects, hasCheckOfMaximumTargetPosition) {
		breakpointObjects.forEach(({ sourceElement, targetElement, targetPosition }) => {
			const childElementsOfTargetElement = this.#getChildElementsOfTargetElement(targetElement);

			if (hasCheckOfMaximumTargetPosition) {
				this.#throwExceptionIfMaximumTargetPositionIsExceeded(childElementsOfTargetElement, targetPosition);
			}

			const childElementOfTargetElement = childElementsOfTargetElement[targetPosition];

			if (childElementOfTargetElement) {
				childElementOfTargetElement.before(sourceElement);
			} else {
				targetElement.append(sourceElement);
			}
		});
	}

	#throwExceptionIfMaximumTargetPositionIsExceeded(childElementsOfTargetElement, targetPosition) {
		const maximumTargetPosition = childElementsOfTargetElement.length;

		if (targetPosition > maximumTargetPosition) {
			throw RangeError(
				`the number specified as the value for the 'targetPosition' parameter exceeds the maximum allowed value of '${maximumTargetPosition}'`
			);
		}
	}

	#generateBreakpointObject(sourceElement, isComplete) {
		const parentElementOfSourceElement = sourceElement.parentElement;

		const breakpointObject = {
			targetElement: parentElementOfSourceElement,
			targetPosition: [...parentElementOfSourceElement.children].findIndex(
				(childElementOfSourceElement) => childElementOfSourceElement === sourceElement
			),
		};

		if (isComplete) {
			breakpointObject.sourceElement = sourceElement;
		}

		return breakpointObject;
	}
}

/*---------------------------------------------------------------------------------------------------------------
Transfer elements in header
----------------------------------------------------------------------------------------------------------------*/

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
