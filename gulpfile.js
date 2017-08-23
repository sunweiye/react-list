const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const merge = require('merge2');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');

let directories = {
    npm: {
        src: './node_modules'
    },
    scripts: {
        libs: [
        ],
        src: 'src/react/**/*.js',
        react: 'src/react/index.js',
        dest: 'dist/js/',

    },
    styles: {
        src: [
            'src/styles/**/*.scss'
        ],
        dest: 'dist/styles/'
    }
};

/**
 * combine tasks
 */
gulp.task('default', ['build', 'watch']);

gulp.task('build', ['styles', 'scripts']);

gulp.task('styles', function () {
    return gulp.src(directories.styles.src)
        .pipe(plumber({errorHandler: console.log}))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                directories.npm.src,
                directories.styles.src
            ]
        }))
        .pipe(gulp.dest(directories.styles.dest));
});

gulp.task('scripts', function () {
    let libraries = gulp.src(directories.scripts.libs)
        .pipe(plumber({errorHandler: console.log}));

    let reactApplication = browserify({
        entries: directories.scripts.react,
        debug: true
    })
        .transform(babelify)
        .bundle()
        .on("error", function (err) {
            gutil.log(
                gutil.colors.red("Browserify compile error:"),
                err.message
            );
        })
        .pipe(source('ReactApp.js'))
        .pipe(buffer());

    return merge(
        libraries,
        reactApplication
    )
        .pipe(plumber({errorHandler: console.log}))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(directories.scripts.dest));
});

/**
 * watcher
 */
gulp.task('watch', function () {
    gulp.watch([directories.scripts.src], ['scripts']);
    gulp.watch([directories.styles.src], ['styles']);
});

