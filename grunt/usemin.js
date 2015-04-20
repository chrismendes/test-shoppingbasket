// Documentation: https://github.com/yeoman/grunt-usemin
// Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)

module.exports = function(grunt) {

    var useminPrepare = grunt.config('useminPrepare') || {};
    var usemin = grunt.config('usemin') || {};

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare = {
        options: {
            dest: '<%= config.dist.root %>'
        },
        html: [
            '<%= config.dev.root %>/index.html',
            '<%= config.dev.scripts %>/main.js'
        ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin = {
        html: [
            '<%= config.dist.root %>/{,*/}*.html',
            '<%= config.dist.scripts %>/{,*/}*.js'
        ],
        css: ['<%= config.dist.styles %>/{,*/}*.css']
    };


    grunt.config('useminPrepare', useminPrepare);
    grunt.config('usemin', usemin);

};


// Substitute configuration for cssmin, uglify, concat if preferred over usemin above

// By default, your `index.html`'s <!-- Usemin block --> will take care of
// minification. These next options are pre-configured if you do not wish
// to use the Usemin blocks.
// cssmin: {
//     dist: {
//         files: {
//             '<%= config.dist %>/styles/main.css': [
//                 '.tmp/styles/{,*/}*.css',
//                 '<%= config.app %>/styles/{,*/}*.css'
//             ]
//         }
//     }
// },
// uglify: {
//     dist: {
//         files: {
//             '<%= config.dist %>/scripts/scripts.js': [
//                 '<%= config.dist %>/scripts/scripts.js'
//             ]
//         }
//     }
// },
// concat: {
//     dist: {}
// },