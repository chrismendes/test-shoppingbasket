// Documentation: https://github.com/nDmitry/grunt-autoprefixer
// Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.

module.exports = function(grunt) {

    var autoprefixer = grunt.config('autoprefixer') || {};

    // Add vendor prefixed styles
    autoprefixer = {
        default: {
            options: {
                browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1'],
                // diff: true // (Highlights the CSS added)
            },
            files: [{
                expand: true,
                cwd: '<%= config.dev.styles %>',
                src: '{,*/}*.css',
                dest: '<%= config.dev.styles %>'
            }]
        }
    };

    grunt.config('autoprefixer', autoprefixer);

};