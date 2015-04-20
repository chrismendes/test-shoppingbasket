// Documentation: https://github.com/gruntjs/grunt-contrib-htmlmin
// Minify HTML.

module.exports = function(grunt) {

    var htmlmin = grunt.config('htmlmin') || {};

    htmlmin = {
        dist: {
            options: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeCommentsFromCDATA: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
            },
            files: [{
                expand: true,
                cwd: '<%= config.dist.root %>',
                src: '{,*/}*.html',
                dest: '<%= config.dist.root %>'
            }]
        }
    };

    grunt.config('htmlmin', htmlmin);

};