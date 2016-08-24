'use strict';

const Bundle = require('./bundle');
const Del = require('del');
const Gulp = require('gulp');
const Concat = require('gulp-concat');
const Fs = require('fs');
const If = require('gulp-if');
const Merge = require('merge-stream');
const MinifyCss = require('gulp-minify-css');
const Newer = require('gulp-newer');
const Path = require('path');
const Uglify = require('gulp-uglify');
const Yargs = require('yargs');

const argv = Yargs.argv;

const config = {
    css: {
        bundles: Bundle.css,
        srcDir: Path.join(__dirname, 'assets'),
        dstDir: Path.join(__dirname, 'src/css')
    },
    js: {
        bundles: Bundle.js,
        srcDir: Path.join(__dirname, 'assets'),
        dstDir: Path.join(__dirname, 'src/js')
    },
    fonts: {
        srcDir: Path.join(__dirname, 'assets/fonts'),
        dstDir: Path.join(__dirname, 'src/fonts')
    }
}

Gulp.task('bundle-js', () => {

    return Merge(Object.keys(config.js.bundles).map(file => {

        const bundle = config.js.bundles[file];
        const dstFile = file + '.js';
        const dstDir = config.js.dstDir;
        const src = bundle.map((f) => {
            return Path.join(config.js.srcDir, f);
        });

        return Gulp.src(src)
            .pipe(Newer(Path.join(dstDir, dstFile)))
            .pipe(If(argv.production, Uglify()))
            .pipe(Concat(dstFile))
            .pipe(Gulp.dest(dstDir))
    }));
});

Gulp.task('bundle-css', () => {

    return Merge(Object.keys(config.css.bundles).map(file => {

        const bundle = config.css.bundles[file];
        const dstFile = file + '.css';
        const dstDir = config.css.dstDir;
        const src = bundle.map((f) => {
            return Path.join(config.css.srcDir, f);
        });

        return Gulp.src(src)
            .pipe(Newer(Path.join(dstDir, dstFile)))
            .pipe(If(argv.production, MinifyCss()))
            .pipe(Concat(dstFile))
            .pipe(Gulp.dest(dstDir))
    }));
});

Gulp.task('copy-fonts', () => {

    return Gulp.src(config.fonts.srcDir + '/**/*.*')
        .pipe(Gulp.dest(config.fonts.dstDir))
});

Gulp.task('copy-scripts', () => {

    return Gulp.src(Path.join(config.js.srcDir, 'Scripts') + '/**/*.*')
        .pipe(Gulp.dest(Path.join(__dirname, 'src/Scripts')))
});

Gulp.task('copy-html-scripts', () => {

    return Gulp.src(Path.join(config.js.srcDir, 'Scripts') + '/**/*.html')
        .pipe(Gulp.dest(Path.join(__dirname, 'src/Scripts')))
});

Gulp.task('watch', () => {

    Gulp.watch(config.css.srcDir + '/**/*.css', ['bundle-css']);
    Gulp.watch(config.js.srcDir + '/**/*.js', ['bundle-js']);
    Gulp.watch(config.js.srcDir + '/**/*.html', ['copy-html-scripts']);
});

Gulp.task('clean', () => {

    return Del([
        config.css.dstDir,
        config.js.dstDir,
        config.fonts.dstDir,
        Path.join(__dirname, 'src/Scripts'),
        Path.join(__dirname, 'public')
    ]);
});

Gulp.task('build', ['bundle-js', 'bundle-css', 'copy-fonts', 'copy-scripts']);

Gulp.task('default', ['bundle']);
