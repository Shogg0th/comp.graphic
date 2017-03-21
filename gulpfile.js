// Load Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    });

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

// Run "gulp server"
gulp.task('server', ['serve', 'watch']);

// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function () {
    return gulp.src('assets/js/*.js')
       
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('build'));
});

// Less to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function () {
    return gulp.src('assets/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build')).on('error', gutil.log)
        .pipe(plugins.livereload());
});

// Default task
gulp.task('watch', function () {
    plugins.livereload.listen();
    gulp.watch('index.html');
    gulp.watch('assets/js/libs/**/*.js');
    gulp.watch('assets/js/*.js', ['build-js']);
    gulp.watch('assets/less/**/*.less', ['build-css']);
});

gulp.task('serve', function () {
    var server = plugins.serve.static('/', 1488);
    server.start();
    gulp.watch(['build/*','index.html'], function (file) {
        server.notify.apply(server, [file]);
    });
});
