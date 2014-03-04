module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        compass : {
            dist : {
                options: {
                    httpPath: '/',
                    sassDir: 'source/sass',
                    cssDir: 'source/stylesheets',
                    imagesDir: 'images',
                    outputStyle: 'compressed',
                    relativeAssets: true
                }
            }
        },

        watch : {
            css : {
                files: ['source/sass/**/*.scss'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            },
            js : {
                files : ['source/javascripts/*.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            docs : {
                files: ['index.html'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['watch']);

}