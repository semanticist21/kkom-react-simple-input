const gulp = require("gulp");
const ts = require("gulp-typescript");
const merge = require("merge2");
const terser = require("gulp-terser");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("compile", () => {
  const tsResult = gulp.src(["lib/**/*.ts", "lib/**/*.tsx"]).pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest("dist")), // Generate declaration files
    tsResult.js.pipe(gulp.dest("dist")), // Generate JavaScript files
  ]);
});

gulp.task("minify", () => {
  return gulp.src("dist/**/*.js").pipe(terser()).pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("compile", "minify"));
