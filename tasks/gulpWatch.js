const gulp = require("gulp");
const browserSync = require("browser-sync");
const sassCompile = require("./sassCompile");
const pugCompile = require("./pugCompile");
const htmlCompile = require("./htmlCompile");
const copyImages = require("./copyImages");
const babelCompile = require("./babelCompile");

const template_config = 'html'

function gulpWatch() {
	// Watch Sass
	gulp.watch("./src/styles/**/*.scss").on('change', gulp.series(sassCompile, browserSync.reload));
	// Watch Tailwind
	gulp.watch("./src/styles/**/*.css").on('change', gulp.series(browserSync.reload));
	// Watch Pug
	template_config === 'pug' ? gulp.watch("./src/template/**/*.pug").on('change', gulp.series(pugCompile, sassCompile, browserSync.reload)) : gulp.watch("./src/template_html/**/*.html").on('change', gulp.series(htmlCompile, sassCompile, browserSync.reload));
	// Watch Images
	gulp.watch("./src/images/*.*").on('change', gulp.series(copyImages, browserSync.reload));
	// Watch JS
	gulp.watch("./src/scripts/*.js").on('change', gulp.series(babelCompile, browserSync.reload));
}

module.exports = gulpWatch