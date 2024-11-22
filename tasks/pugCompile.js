const gulp = require("gulp");
const pug = require("gulp-pug");

function pugCompile() {
	return gulp.src([
			// Ignore files start with underscore
			"./src/template/**/*.pug",
			"!./src/template/_**/*",
		])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest("./dist"));
}

module.exports = pugCompile;