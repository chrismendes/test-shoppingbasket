// Documentation: https://github.com/shakyshane/grunt-browser-sync | http://addyosmani.com/blog/browser-sync
// Grunt Task for keeping multiple browsers & devices in sync when building websites.

module.exports = function(grunt) {

    var browserSync = grunt.config('browserSync') || {};

    browserSync = {
        dev: {
            bsFiles: {
                src: [ '<%= config.dev.styles %>/*.css',
                       '<%= config.dev.images %>/**/*.jpg',
                       '<%= config.dev.images %>/**/*.png',
                       '<%= config.dev.scripts %>/*.js',
                       '<%= config.dev.scripts %>/**/*.js',
                       '**/*.html'
                     ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: '<%= config.dev.root %>'
                },
                port: 9000
            }
        },
        dist: {
            options: {
                server: {
                    baseDir: '<%= config.dist.root %>'
                },
                port: 9001
            }
        }
    };

    grunt.config('browserSync', browserSync);

};