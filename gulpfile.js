const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const ghPages = require('gulp-gh-pages');

gulp.task('server', function() {
    
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('changed', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({prefix: "", suffix: ".min"}))
            .pipe(autoprefixer({overrideBrowserslist: ['last 2 version'], cascade: false}))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel('scripts'));
    gulp.watch("src/**/*.json").on("change", gulp.parallel('json'));
    gulp.watch("src/fonts/**/*").on("all", gulp.parallel('fonts'));
    gulp.watch("src/icons/**/*").on("all", gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on("all", gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('json', function () {
    return gulp.src("src/**/*.json")
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});


gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*') // Изменяем путь на папку "dist"
        .pipe(ghPages({
            branch: 'artem', // Замените 'your_branch_name' на желаемое название ветки
            remoteUrl: 'https://github.com/Grimdvl/Artem.git'
        }));
});

// Обновленная задача 'default', включая новые задачи
gulp.task('default', gulp.parallel(
    'watch',
    'server',
    'styles',
    'scripts',
    'json',
    'icons',
    'mailer',
    'html',
    'images',
    'fonts',
));