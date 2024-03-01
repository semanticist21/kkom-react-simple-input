const gulp = require("gulp");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("scripts", () => {
  return tsProject
    .src() // TypeScript 파일 위치
    .pipe(tsProject()) // TypeScript 컴파일
    .js // 컴파일된 JavaScript 파일 가져오기
    .pipe(terser()) // JavaScript 파일 minify
    .pipe(gulp.dest("dist")); // minify된 파일을 저장할 위치
});

gulp.task("default", gulp.series("scripts"));
