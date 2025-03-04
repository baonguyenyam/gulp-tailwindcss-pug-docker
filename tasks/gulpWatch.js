const gulp = require("gulp");
const browserSync = require("browser-sync");
const sassCompile = require("./sassCompile");
const pugCompile = require("./pugCompile");
const copyImages = require("./copyImages");
const babelCompile = require("./babelCompile");
const copyJS = require("./copyJS");

function gulpWatch() {
	// Watch Sass
	gulp.watch("./src/styles/**/*.scss").on('change', gulp.series(sassCompile, browserSync.reload));
	// Watch Tailwind
	gulp.watch("./src/styles/**/*.css").on('change', gulp.series(browserSync.reload));
	// Watch Pug
	gulp.watch("./src/template/**/*.pug").on('change', gulp.series(pugCompile, sassCompile, browserSync.reload));
	// Watch Images
	gulp.watch("./src/images/*.*").on('change', gulp.series(copyImages, browserSync.reload));
	// Watch JS
	gulp.watch("./src/scripts/*.js").on('change', gulp.series(babelCompile, copyJS, browserSync.reload));
}

module.exports = gulpWatch;