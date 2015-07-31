'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // show elapsed time at the end
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      app: '../thetalko/'
    },
    watch: {
      less: {
        files: ['<%= dirs.app %>wp-content/themes/thetalko/css/*.less'],
        tasks: ['less']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    }
    less: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
        },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.app %>/css/less/',
          src: ['main.less'],
          dest: '<%= dirs.app %>/css/',
          ext: '.css'
        }]
      }
    },
    // Add vendor prefixed styles
    autoprefixer: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.app %>wp-content/themes/thetalko/css/',
          src: '<%= dirs.app %>wp-content/themes/thetalko/css/*.css',
          dest: '<%= dirs.app %>wp-content/themes/thetalko/css/'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.app %>/public/images/**',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= dirs.app %>/public/images/**'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.app %>/public/images/**',
          src: '{,*/}*.svg',
          dest: '<%= dirs.app %>/public/images/**'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= dirs.app %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= dirs.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    uncss: {
        dist: {
          options: {
              ignore: ['.fadeIn', '.ui-datepicker', '.ui-datepicker-header', '.ui-datepicker-next', '.ui-datepicker-prev', '.ui-icon-circle-triangle-w', '.ui-icon-circle-triangle-e', '.ui-datepicker-calendar', '.ui-datepicker-calendar thead', '.ui-datepicker-calendar td', '.ui-datepicker-calendar th']
          },
          files: {
            '<%= dirs.app %>/public/css/prod-main.css': ['http://www.lead.com.jonathan/']
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'less',
      'copy:server',
      'connect:livereload',
      'autoprefixer',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('styles', [
      'less',
      'autoprefixer'
  ]);

  grunt.registerTask('deploy', [
      'less',
      'autoprefixer',
      'imagemin',
      'svgmin'
  ]);

  grunt.registerTask('default', [
    'less'
  ]);
};
