// Documentation: https://github.com/gruntjs/grunt-contrib-copy
// Copy files and folders.

module.exports = function(grunt) {

    var copy = grunt.config('copy') || {};

    // Copies remaining files to places other tasks can use
    copy = {
        default: {
            files: [
                // Core root directory files, plus images
                {
                    expand: true,
                    dot:    true,
                    cwd:    '<%= config.dev.root %>',
                    dest:   '<%= config.dist.root %>',
                    src: [
                        '*.{ico,png,jpg,txt}',
                        '.htaccess',
                        'sitemap.xml',
                        'images/*.{png,jpg,gif}',
                        'images/decor/*',
                        'images/projects/**/*',
                        'images/photos/*',
                        'docs/*',
                        '*.html',
                        'fonts/{,*/}*.*',
                        'locales/*'
                    ]
                },
                // Monopoly project
                {
                    src:        [ 'misc/monopoly/*.*' ],
                    dest:       '<%= config.dist.root %>/monopoly/',
                    expand:     true,
                    flatten:    true
                }
            ]
        }
    };

    grunt.config('copy', copy);

};