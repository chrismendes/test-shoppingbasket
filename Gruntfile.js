// "module" is undefined here, but it's how grunt works, so we turn this jshint option off in this case.
/* jshint undef:false */

// Gruntfile is always going to be long, so no point worrying about max statements in a function.
/* jshint maxstatements:false */

// We don't really care about complexity here, grunt files are always hefty.
/* jshint maxcomplexity:false */

module.exports = function (grunt) {

    'use strict';

    // Configurable paths
    var config = {
        dev: {
            root: 'src',
            styles: 'src/scss',
            scripts: 'src/js',
            libraries: 'src/libs',
            images: 'src/images',
            fonts: 'src/fonts'
        },
        dist: {
            root: 'dist',
            styles: 'dist/css',
            scripts: 'dist/js',
            images: 'dist/images',
            fonts: 'dist/fonts'
        }
    };

    // Define the configuration for all the tasks
    grunt.initConfig({ config: config });

    // Load all our tasks from dir ./grunt
    grunt.loadTasks('grunt');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'browserSync:dist']);
        }
        grunt.task.run([
            'clean:server',
            'sass',
            'autoprefixer',
            'browserSync:dev',
            'watch'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            /* jshint maxlen: 200 */
            'clean:dist',             // Clear our current dist directory before new build
            'jshint',                 // Lint JS
            'useminPrepare',          // Usemin task step 1, gather all "build:js/css" comment blocks in index.html for subsequent task configuration
            'sass',                   // Compile scss
            'autoprefixer',           // Inject browser-specific CSS style prefixes, such as "-webkit" and "-moz"
            'concat',                 // Configured by useminPrepare task, concatenate CSS/JS
            'cssmin',                 // Configured by useminPrepare task, minify CSS
            'uglify',                 // Configured by useminPrepare task, compile non-main.js JS, e.g. ie8.js (main.js by requirejs below)
            'copy',                   // Copy essential files to dist directory
            'imagemin',               // Optimise images to reduce file sizes
            'modernizr',              // Replace dist modernizr.js with tailored version based on JS/CSS tests in use
            'filerev',                // Append content-based hash to asset filenames for cache busting purposes
            'usemin',                 // Replace references to now concatenated and optimised assets via useminPrepare and other tasks above
            'htmlmin',                // Minify HTML
        ]);
    });

    grunt.registerTask('default', [
        'build'
    ]);

};