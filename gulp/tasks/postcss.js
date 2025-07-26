import gulp from "gulp";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

import { filePaths } from "../config/paths.js";
import { logger } from "../config/logger.js";

const css = () => {
	return gulp
		.src(filePaths.src.postcss)
		.pipe(logger.handleError("Postcss creating"))
		.pipe(
			postcss([
				autoprefixer({
					browsers: ["> 5%", "last 2 versions", "ie > 7"],
				}),
			])
		)
		.pipe(gulp.dest(filePaths.build.postcss));
};
export { css };
