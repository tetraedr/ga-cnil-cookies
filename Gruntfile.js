module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    clean: ['dist/'] ,

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },


    uglify: {
      dist: {
        files: {
          'dist/ga-cnil-cookies.min.js': ['src/ga-cnil-cookies.js']
        }
      }
    },

    copy: {
          dist: {
            files: [
              {expand: true,  cwd: 'src/', src: ['**.js','**.css'], dest: 'dist/', filter: 'isFile'},
            ],
          },
        },


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dist',['clean','jshint','uglify:dist','copy:dist']);

};