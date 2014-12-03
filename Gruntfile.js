module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Dev http server
    'http-server': {
      dev: {
        port: 8100,
        host: "127.0.0.1",
        showDir : true,
        autoIndex: true,
        ext: "html"
      },
    },

    concat: {
      // Vendor files from Bower
      vendor_js : {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-local-storage/dist/angular-local-storage.js',
          'bower_components/angular-translate/angular-translate.js',
          'bower_components/angular-humanSeconds/angular-humanSeconds.js',
          'bower_components/angular-route/angular-route.js',
        ],
        dest: 'medias/vendor.js'
      },
      vendor_css : {
        src : [
          'bower_components/bootswatch-dist/css/bootstrap.css',
        ],
        dest: 'medias/vendor.css',
      }
    },

    // Less compilation to css
    less: {
      dev : {
        options: {
          paths: ["medias/less"]
        },
        files: {
          "medias/toulouse.css": "medias/less/main.less"
        }
      },
    },

    // Watcher in dev, for less files
    watch: {
      scripts: {
        files: ['medias/less/**.less'],
        tasks: ['less:dev'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Custom tasks
  grunt.registerTask('default', [
    'concat', // build vendors assets
    'less:dev', // build our style
    'http-server:dev', // serve our app & medias
  ]);
};
