// npm install --save-dev gulp gulp-sass gulp-postcss autoprefixer postcss-pxtorem cssnano gulp-uglify gulp-concat gulp-responsive-images gulp-imageoptim browser-sync

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    postcssautoprefixer = require('autoprefixer'),
    postcsspxtorem = require('postcss-pxtorem'),
    postcsscssnano = require('cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    responsiveImages = require('gulp-responsive-images'),
    imageOptim = require('gulp-imageoptim'),
    browserSync = require('browser-sync');


/* ------default and watch----- */
gulp.task('sass', function() {
    var plugins = [
        postcssautoprefixer({
            browsers: ['last 2 versions', '> .5% in US']
        }),
        postcsspxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['*'],
            replace: true
        }),
        postcsscssnano({
            calc: false,
            colorMin: false,
            convertValues: false,
            discardUnused: false,
            zindex: false,
            reduceIdents: false,
            mergeIdents: false,
            minifySelectors: false,
            minifyFontValues: false,
            normalizeUrl: false,
            safe: true,
            mergeRules: true
        })
    ];

    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    return gulp.src(['src/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// browsersync initialize
gulp.task('browserSync', function(done) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    done();
});
// broswersync reload
gulp.task('browserSyncReload', function(done) {
    browserSync.reload();
    done();
});



/* ------img----- */

// responsive images
gulp.task('responsiveImages', function(done) {
    gulp.src('src/img/article/**/*')
        .pipe(responsiveImages({
            '*.jpg': [{
                width: 400,
                quality: 100,
                suffix: '@400'
            }, {
                width: 800,
                quality: 80,
                suffix: '@800'
            }, {
                width: 1200,
                quality: 70,
                suffix: '@1200'
            }, {
                width: 1600,
                quality: 60,
                suffix: '@1600'
            }, {
                width: 2000,
                quality: 50,
                suffix: '@2000'
            }, {
                quality: 90,
            }],
            '*.png': [{
                width: 400,
                quality: 100,
                suffix: '@400'
            }, {
                width: 800,
                quality: 80,
                suffix: '@800'
            }, {
                width: 1200,
                quality: 70,
                suffix: '@1200'
            }, {
                width: 1600,
                quality: 60,
                suffix: '@1600'
            }, {
                width: 2000,
                quality: 50,
                suffix: '@2000'
            }, {
                quality: 90,
            }]
        }))
        .pipe(gulp.dest('portfolio/img/article'));
    done();
});

//image optim
gulp.task('imageOptim', function(done) {
    return gulp.src('portfolio/img/article/**/*')
        .pipe(imageOptim.optimize())
        .pipe(gulp.dest('img/article'));
    done();
});



/* runners */
gulp.task('watch', gulp.series(['sass', 'js', 'browserSync', 'browserSyncReload'], function() {
    browserSync;
    gulp.watch('src/**/*.scss', gulp.parallel(['sass']));
    gulp.watch('src/js/**/*.js', gulp.parallel(['js']));
    gulp.watch('./**/*.html', gulp.parallel(['browserSyncReload']));
}));


gulp.task('default', gulp.series('sass', 'js'));