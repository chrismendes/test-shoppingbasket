// Documentation: https://github.com/sindresorhus/grunt-sass
// Compile Sass to CSS

module.exports = function(grunt) {

    var sass = grunt.config('sass') || {};

    // Compiles Sass to CSS and generates necessary files if requested
    sass = {
        default: {
            files: [{
                expand: true,
                cwd: '<%= config.dev.styles %>',
                src: ['*.scss'],
                dest: '<%= config.dev.styles %>',
                ext: '.css'
            }]
        }
    };

    grunt.config('sass', sass);

};