const gulp = require('gulp');
const wrap = require('gulp-wrap');
const rename = require('gulp-rename');
const { readFileSync } = require('fs');
const jeditor = require('gulp-json-editor');
const path = require('path');
const yaml = require('gulp-yaml');
const YAML = require('yaml');

const accessibilitSpecs = './node_modules/@progress/wct-a11y-spec/dist/blazor';

const readContent = (json) => {
  json.content = `\n${readFileSync(`${accessibilitSpecs}${json.from}`).toString()}\n`;
  return json;
};

const replaceFile = (p) => {
  let configPath = `./configs/${p.basename}.yml`;
  let config = YAML.parse(readFileSync(configPath).toString());
  let parsedPath = path.parse(config.dest);

  return {
    dirname: parsedPath.dir,
    basename: parsedPath.name,
    extname: parsedPath.ext
  };
}

gulp.task('sync-aria-specs', () => gulp.src('./configs/*.aria.yml')
    .pipe(yaml({ safe: true }))
    .pipe(jeditor(readContent))
    .pipe(wrap({ src: './templates/aria-template.md' }))
    .pipe(rename(replaceFile))
    .pipe(gulp.dest('./'))
);

gulp.task('sync-kb-specs', () => gulp.src('./configs/*.kb.yml')
    .pipe(yaml({ safe: true }))
    .pipe(jeditor(readContent))
    .pipe(wrap({ src: './templates/kb-template.md' }))
    .pipe(rename(replaceFile))
    .pipe(gulp.dest('./'))
);

gulp.task('sync-specs', gulp.parallel('sync-aria-specs', 'sync-kb-specs'));