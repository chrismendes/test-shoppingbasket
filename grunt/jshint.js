// Documentation: https://github.com/gruntjs/grunt-contrib-jshint
// Validate files with JSHint.

module.exports = function(grunt) {

    var jshint = grunt.config('jshint') || {};

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint = {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%= config.dev.scripts %>/{,*/}*.js'
        ]
    };

    grunt.config('jshint', jshint);

};