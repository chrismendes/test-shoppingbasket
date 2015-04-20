// Documentation: https://github.com/yeoman/grunt-filerev
// Asset anti-caching measure. Adds content related hash to filename. Usemin task updates references.

module.exports = function(grunt) {

    // Renames files for browser caching purposes
    var filerev = grunt.config('filerev') || {};

    filerev = {
        options: {
            length: 8
        },
        files: {
            src: [
                '<%= config.dist.scripts %>/{,*/}*.js',
                '<%= config.dist.styles %>/{,*/}*.css',
                // (TODO: Fix images reference updating post-rev)
                // '<%= config.dist.images %>/{,*/}*.*',
                '<%= config.dist.fonts %>/{,*/}*.*'
            ]
        }
    };

    grunt.config('filerev', filerev);

};