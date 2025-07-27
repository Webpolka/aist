export default class AistTabs {
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
			this.screenMessage("Отправка прервана в JavaScript вызван метод preventDefault() в модуле tabs.js", 1500);
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
