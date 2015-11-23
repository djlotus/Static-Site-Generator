//_______________________________________________________________________
//__________---___---__---_______________________________________________
//__________---___---__---________________---____________________________
//__________---___---__---________________---____________________________
//______--__---___---__---______----______---___________________---______
//____-----_---___---__---____--------__-------__---____---___-------____
//___---___----___---__---___----__----_-------__---____---__---___---___
//__---_____---___---__---__----____----__---____---____---__---____---__
//__---_____---___---__---__----____----__---____---____---__-------_____
//__---_____---___---__---__---______---__---____---____---___--------___
//__---_____---___---__---__----____----__---____---____---________----__
//__----___----___---__---___---____---___---____---___----__---____---__
//___----------___---__---____--------____-----__----------__----__----__
//_____----_---___---__---_____------______----___-----_---___--------___
//_______________----___________________________________________---______
//______________-----_______________Static Site Generator________________
//______________----_____________________________________________________
//_______________________________________________________________________
//_______________________________________________________________________
//
//
// To Do:   Error Handling,
//          Live Reload,
//          (more)?

var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    path = require('path'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber')
    ;

var paths = {
   templates: 'templates/',
   sass: 'stylesheets/',
   scripts: 'js/',
   css: 'dist/css/'
};

// File Include task (allow for html template system)
// - - - - - - - - - - - - - - - - - - - -

gulp.task('fileinclude', function() {
   return gulp.src(path.join(paths.templates, '*.tpl.html'))
   .pipe(plumber())
   .pipe(fileinclude())
   // Strip file .html extension from file leaving .tpl as new extension
   .pipe(rename( {
      extname: ""
   }))
   // Replace new extension (.tpl) with .html
   .pipe(rename( {
      extname: ".html"
   }))
   // Set destination for files
   .pipe(gulp.dest('dist/'))
   // Confirmation message
   .pipe(notify( { 
      message: 'HTML pages generated'
   }))
});

// Sass task (forced to run as first process in CSS)
// - - - - - - - - - - - - - - - - - - - -
gulp.task('sass', function(doFirst) {
   return gulp.src(path.join(paths.sass, '*.scss'))
   .pipe(plumber())
   // Set Sass options
   .pipe(sass.sync( { 
      outputStyle: 'nested',
      sourceComments: 'map',
      errLogToConsole: 'false'
   } ))
   // Set Autoprefixer browsers
   .pipe(autoprefixer( {
      browsers: [
         'last 4 version',
         'not ie < 8',
         'iOS',
         'FirefoxAndroid'
      ]
   } ))
   // Set destination for files
   .pipe(gulp.dest('dist/css'))
   // Confirmation message
   .pipe(notify( {
      message: 'Stylesheets have been compliled'
   }));
   doFirst(err);
});

// Concantonate scripts
// - - - - - - - - - - - - - - - - - - - -
gulp.task('scripts', function() {
   return gulp.src(path.join(paths.scripts, '*.js'))
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest('dist/js'))
});

// Concantonate CSS (forced to run as second process in CSS)
// - - - - - - - - - - - - - - - - - - - -
gulp.task('concatCss', ['sass'], function (doSecond) {
   return gulp.src(path.join(paths.css, '*.css'))
      .pipe(concatCss('main.css'))
      .pipe(gulp.dest('dist/css'));
   doSecond(err);
});

// Remove Unused CSS (forced to run as third process in CSS)
// - - - - - - - - - - - - - - - - - - - -
gulp.task('uncss', ['concatCss'], function(doThird) {
   return gulp.src('dist/css/main.css')
      .pipe(uncss( {
         html: [
            'dist/*.html'
         ]
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(notify( {
         message: 'Unused CSS has been removed'
      }));
   doThird(err);
});

// Minify CSS (forced to run as last process in CSS)
// - - - - - - - - - - - - - - - - - - - -

gulp.task('minifyCss', ['uncss'], function() {
   return gulp.src('dist/css/main.css')
      .pipe(minifyCss({compatibility: 'ie8'}))
   // Strip file extension
      .pipe(rename( {
      extname: ""
   }))
   // Replace file extension with ".min.css"
      .pipe(rename( {
      extname: ".min.css"
   }))
   .pipe(notify( {
      message: 'The CSS file has been renamed'
   }))
      .pipe(gulp.dest('dist/css'))
      .pipe(notify( {
      message: 'CSS has been minified'
   }))
});


// Watch task
// - - - - - - - - - - - - - - - - - - - -
gulp.task('watch', function() {
   //Watch task for sass
   gulp.watch(path.join(paths.sass, '*.scss'), ['sass']);
   // watch task for gulp-includes
   gulp.watch(path.join(paths.templates, '*.html'), ['fileinclude']);
});

// Default Gulp task (builds out static site)
// - - - - - - - - - - - - - - - - - - - -
gulp.task('default', ['fileinclude', 'scripts', 'sass', 'concatCss', 'uncss', 'minifyCss'], function() {

});