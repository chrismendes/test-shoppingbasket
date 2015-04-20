// Documentation: https://github.com/Ensighten/grunt-spritesmith
// Generate sprite sheets and corresponding CSS

module.exports = function(grunt) {

    var spritesmith = grunt.config('sprite') || {};

    spritesmith = {

        default: {
            src:            [
                            '<%= config.dev.images %>/sprites/*.png',
                            ],
            destImg:        '<%= config.dev.images %>/spritesheet.png',
            destCSS:        '<%= config.dev.styles %>/core/sprites.scss',
            cssFormat:      'scss',
            imgPath:        '../images/spritesheet.png',
            algorithm:      'left-right'
        }

    };

    grunt.config('sprite', spritesmith);

};