// Documentation: https://github.com/gruntjs/grunt-contrib-cssmin
// Compress CSS files.

// Substitute configuration for cssmin if preferred over usemin method (see usemin task)

// By default, your `index.html`'s <!-- Usemin block --> will take care of
// minification. These next options are pre-configured if you do not wish
// to use the Usemin blocks.


// module.exports = function(grunt) {

//     var cssmin = grunt.config('cssmin') || {};

//     cssmin = {
//         dist: {
//             files: {
//                 '<%= config.dist.root %>/styles/main.css': [
//                     '.tmp/<%= config.dist.styles %>/{,*/}*.css',
//                     '<%= config.dev.styles %>/{,*/}*.css'
//                 ]
//             }
//         }
//     };

//     grunt.config('cssmin', cssmin);

// }