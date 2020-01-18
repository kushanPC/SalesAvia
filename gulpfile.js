
const gulp = require('gulp');
const njkRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const browserSync = require('browser-sync');

const { reload } = browserSync;

const njkData = require('./src/data.json');

const path = {
  build: { // куда выплюнуть
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    njk: 'build/',
  },
  src: { // исходники
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    njk: 'src/nunjucks/index.njk',
  },
  watch: { // наблюдение
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    njk: 'src/nunjucks/**/*.njk',
  },
  clean: './build',
};


const config = {
  server: {
    baseDir: './build',
  },
  tunnel: false,
  host: 'localhost',
  port: 8080,
  logPrefix: 'Frontend_Devil',
};

gulp.task('json:build', () => {
  gulp.src('src/json.json')
    .pipe(gulp.dest('build/js'));
});

gulp.task('html:build', () => {
  gulp.src(path.src.html)
    .pipe(rigger()) // rigger
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});


gulp.task('js:build', () => {
  gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});


gulp.task('style:build', () => {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});


gulp.task('image:build', () => {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
      interlaced: true,
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});


gulp.task('fonts:build', () => {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});


gulp.task('nunjucks', () => gulp.src(path.src.njk)
  // Adding data to Nunjucks
  .pipe(data(() => njkData))
  .pipe(njkRender())
  .pipe(gulp.dest(path.build.njk))
  .pipe(reload({ stream: true })));


gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'nunjucks',
  'json:build',
]);


gulp.task('watch', () => {
  watch([path.watch.html], () => {
    gulp.start('html:build');
    gulp.start('nunjucks');
  });
  watch([path.watch.style], () => {
    gulp.start('style:build');
  });
  watch([path.watch.js], () => {
    gulp.start('js:build');
  });
  watch([path.watch.img], () => {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], () => {
    gulp.start('fonts:build');
  });
  gulp.watch([path.watch.njk], ['nunjucks']);
});


gulp.task('webserver', () => {
  browserSync(config);
});


gulp.task('clean', (cb) => {
  rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'nunjucks', 'webserver', 'watch']);
