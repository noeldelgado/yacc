module.exports = (grunt) => {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compact'
        },
        files: {
          'source/stylesheets/project.css': 'source/sass/project.scss'
        }
      }
    },

    watch: {
      css: {
        files: ['source/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['source/javascripts/*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      docs: {
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
};
