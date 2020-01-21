const gulp = require('gulp');
const gtag = require('gulp-gtag');
const sitemap = require('gulp-sitemap');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const useref = require('gulp-useref');


function googleAnalytics(){
    return gulp.src('./*.html')
            .pipe(gtag({ uid: 'UA-154979814-1', tag: 'head' }))
            .pipe(gulp.dest('./'))
}

function googleSitemap(){
    return gulp.src('./*.html')
    .pipe(sitemap({
        siteUrl: 'https://zyclyx.com/'
    }))
    .pipe(gulp.dest('./dist/'))
}

function htmlMin(){
    return gulp.src('./dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments:true, minifyCSS: true, minifyJS: true }))
    .pipe(gulp.dest('./dist/'))
}
function cssMin(){
    return gulp.src('./dist/css/**/*.css')
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css/'))
}
function jsMin(){
    return gulp.src('./dist/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    
}
function imageMin(){
    return gulp.src('./images/**/*')
    .pipe(newer('./disi/images/'))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'))
}
function concatFiles (){
    return gulp.src('./*.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist/'))
}
function copyFonts(){
    return gulp.src("./fonts/*")
    .pipe(gulp.dest("dist/fonts/"))
}

function copyFavicon(){
    return gulp.src("./favicon.png")
        .pipe(gulp.dest("dist/"))
}
function robotTxt(){
    return gulp.src('./robots.txt')
    .pipe(gulp.dest('./dist/'))
}
function htaccess(){
    return gulp.src('./.htaccess')
    .pipe(gulp.dest('./dist/'))
}

const build = gulp.series(concatFiles, htmlMin, cssMin, jsMin, imageMin, copyFonts, copyFavicon, robotTxt, htaccess)

exports.googleAnalytics = googleAnalytics;
exports.googleSitemap = googleSitemap;
exports.htmlmin = htmlMin;
exports.cleanCSS = cssMin;
exports.uglify = jsMin;
exports.imagemin = imageMin;
exports.concatFiles = concatFiles;
exports.copyFonts = copyFonts;
exports.copyFavicon = copyFavicon;
exports.robotTxt = robotTxt;
exports.htaccess = htaccess;
exports.build = build;