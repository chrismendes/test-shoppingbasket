// Documentation: https://github.com/gruntjs/grunt-contrib-clean
// Clear files and folders.

module.exports = function(grunt) {

    var clean = grunt.config('clean') || {};

    // Empties folders to start fresh
    clean = {
        dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp',
                    '<%= config.dist.root %>/*',
                    '!<%= config.dist.root %>/.git*'
                ]
            }]
        },
        server: '.tmp'
    };
    
    grunt.config('clean', clean);

};