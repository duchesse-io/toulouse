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
      dist: {
        port: 8200,
        root : 'dist',
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

    // Build workflow for distribution
    clean : {
      dist : ['dist, '],
    },
    copy : {
      dist : {
        files : [
          {
            src : 'app/index.html',
            dest : 'dist/index.html',
          },
          {
            expand : true,
            cwd : 'app/templates',
            src : ['**.html', ],
            dest : 'dist/templates'
          },
          {
            expand : true,
            cwd : 'medias/img',
            src : ['**.png', '**.jpg', '**.gif', ],
            dest : 'dist/medias/img'
          },
        ],
      },
    },
    useminPrepare : {
      src : ['app/index.html', ],
      options : {
        root : '.',
      },
    //  dest : 'dist',
    },
    usemin : {
      html : 'dist/index.html',
    },
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Dev default task
  grunt.registerTask('default', [
    'concat', // build vendors assets
    'less:dev', // build our style
    'http-server:dev', // serve our app & medias
  ]);

  // Build distribution
  grunt.registerTask('build', [
    'clean:dist',
    'concat:vendor_js', // build base vendors
    'concat:vendor_css',
    'less:dev',
    'copy:dist', // Copy base html & medias
    'useminPrepare', // Detect files to minify & uglify
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin', // Apply modifications to dist html
  ]);
};
