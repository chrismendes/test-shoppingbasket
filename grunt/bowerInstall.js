// Documentation: https://github.com/stephenplusplus/grunt-wiredep (since renamed to "wiredep")
// Inject Bower packages into your source code with Grunt.

module.exports = function(grunt) {

    var bowerInstall = grunt.config('bowerInstall') || {};

    // Automatically inject Bower components into the HTML file
    bowerInstall = {
        app: {
            src: ['<%= config.dev.root %>/index.html']
        }
    };

    grunt.config('bowerInstall', bowerInstall);

};