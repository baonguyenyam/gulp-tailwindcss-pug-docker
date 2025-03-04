// GULP FILE by Nguyen Pham
import gulp from 'gulp';
import browserSync from 'browser-sync';
browserSync.create();

// Tasks
import cleanDist from './tasks/cleanDist.js';
import babelCompile from './tasks/babelCompile.js';
import babelCompilePro from './tasks/babelCompilePro.js';
import sassCompile from './tasks/sassCompile.js';
import browserSyncInit from './tasks/browserSyncInit.js';
import copyCSS from './tasks/copyCSS.js';
import copyJS from './tasks/copyJS.js';
import copyImages from './tasks/copyImages.js';
import pugCompile from './tasks/pugCompile.js';
import sassCompileProduct from './tasks/sassCompileProduct.js';
import compressCSS from './tasks/compressCSS.js';
import compressJS from './tasks/compressJS.js';
import formatHtmlSiteApp from './tasks/formatHtmlSiteApp.js';
import cleanCSS from './tasks/cleanCSS.js';
import copyData from './tasks/copyData.js';

export const basic = gulp.series(
    cleanDist,
    copyCSS,
    copyImages,
    copyJS,
    copyData,
    pugCompile,
);

export default gulp.series(
    basic,
    babelCompile,
    sassCompile,
    browserSyncInit,
);

export const build = gulp.series(
    basic,
    babelCompilePro,
    sassCompileProduct,
    compressCSS,
    compressJS,
    cleanCSS,
    formatHtmlSiteApp,
);