// Documentation: https://github.com/gruntjs/grunt-contrib-imagemin
// Minify PNG and JPEG images.

module.exports = function(grunt) {

    var imagemin = grunt.config('imagemin') || {};

    // The following *-min tasks produce minified files in the dist folder
    imagemin = {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= config.dist.images %>',
                src: '{,*/}*.{gif,jpg,png}',
                dest: '<%= config.dist.images %>'
            }]
        }
    };

    grunt.config('imagemin', imagemin);

};