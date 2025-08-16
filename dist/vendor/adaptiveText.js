export default class ContainerViewportAdaptiveText {
	constructor(el, options) {
		this.element = el;

		const defaultConfig = {
			parent: ".portfolio-work",
		};
		this.options = Object.assign(defaultConfig, options);

		this.onResize = this.onResize.bind(this);
		window.addEventListener("resize", this.onResize);
		this.onResize();
	}
	onResize() {
		const more = window.matchMedia("(min-width: 993px)");
		const lg = window.matchMedia("(max-width: 992px)");
		const md = window.matchMedia("(max-width: 768px)");
		const sm = window.matchMedia("(max-width: 576px)");
		const sm440 = window.matchMedia("(max-width: 440px)");

		if (more.matches) {
			this.cqw({
				styling: "font-size",
				min: 16,
				cqw: 7,
				max: 16,
			});
		}

		if (lg.matches) {
			this.cqw({
				styling: "font-size",
				min: 12,
				cqw: 6,
				max: 17,
			});
		}
		if (md.matches) {
			this.cqw({
				styling: "font-size",
				min: 16,
				cqw: 6,
				max: 21,
			});
		}
		if (sm.matches) {
			this.cqw({
				styling: "font-size",
				min: 12,
				cqw: 6,
				max: 16,
			});
		}
		if (sm440.matches) {
			this.cqw({
				styling: "font-size",
				min: 14,
				cqw: 6,
				max: 20,
			});
		}
	}

	cqw(args) {
		// styling, min, cqw, max) {
		let width = this.element.closest(this.options.parent).offsetWidth;
		let value = Math.max(args.min, Math.min((width / 100) * args.cqw, args.max));
		this.element.style.setProperty(args.styling, value + "px");
	}
}
