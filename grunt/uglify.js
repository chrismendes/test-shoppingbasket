// Documentation: https://github.com/gruntjs/grunt-contrib-uglify
// Minify files with UglifyJS.

// Substitute configuration for uglify if preferred over usemin method (see usemin task)

// By default, your `index.html`'s <!-- Usemin block --> will take care of
// minification. These next options are pre-configured if you do not wish
// to use the Usemin blocks.

/*
module.exports = function(grunt) {

    var uglify = grunt.config('uglify') || {};

    uglify = {
        dist: {
            files: {
                '<%= config.dist.scripts %>/scripts.js': [
                    '<%= config.dist.scripts %>/scripts.js'
                ]
            }
        }
    };

    grunt.config('uglify', uglify);

}
*/