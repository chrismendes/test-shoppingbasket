// Documentation: https://github.com/gruntjs/grunt-contrib-connect
// Start a static web server.
// Currently not in use in favour of BrowserSync (see browserSync.js)

module.exports = function(grunt) {

    var connect = grunt.config('connect') || {};

    // The actual grunt server settings
    connect = {
        options: {
            port: 9000,
            open: true,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                middleware: function(connect) {
                    return [
                        connect.static('.tmp'),
                        connect().use('/bower_components', connect.static('./bower_components')),
                        connect.static('<%= config.dev.root %>')
                    ];
                }
            }
        },
        test: {
            options: {
                open: false,
                port: 9001,
                middleware: function(connect) {
                    return [
                        connect.static('.tmp'),
                        connect.static('test'),
                        connect().use('/bower_components', connect.static('./bower_components')),
                        connect.static('<%= config.dev.root %>')
                    ];
                }
            }
        },
        dist: {
            options: {
                base: '<%= config.dist.root %>',
                livereload: false
            }
        }
    };

    grunt.config('connect', connect);

};