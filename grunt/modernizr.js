// Documentation: https://github.com/Modernizr/grunt-modernizr
// Build out a lean, mean Modernizr machine.

module.exports = function(grunt) {

    var modernizr = grunt.config('modernizr') || {};

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr = {
        dist: {
            devFile: '<%= config.dev.libraries %>/modernizr/modernizr.js',
            outputFile: '<%= config.dist.scripts %>/modernizr.js',
            parseFiles: true,
            extra: {
                cssclasses: true
            },
            files: {
                src: [
                    '<%= config.dev.styles %>/{,*/}*.scss',
                    '<%= config.dev.scripts %>/{,*/}*.js'
                ]
            },
            uglify: true
        }
    };

    grunt.config('modernizr', modernizr);

};