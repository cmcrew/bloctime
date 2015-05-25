module.exports = function(grunt) {

    grunt.registerTask( 'default', [ 'clean', 'browserify', 'sass', 'autoprefixer', 'copy', 'hapi', 'watch'] );

    grunt.registerTask( 'build', [ 'clean', 'browserify', 'sass', 'autoprefixer', 'copy' ] );

    grunt.registerTask( 'run', [ 'hapi', 'watch' ]);

    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    './dist/js/app.js': ['./app/scripts/app.js']
                }
            }
        },
        karma: {
          unit: {
            frameworks: ['mocha', 'chai'],
            options: {
              files: [
                      'https://cdn.firebase.com/js/client/2.2.1/firebase.js',
                      "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.24/angular.min.js",
                      "https://cdn.firebase.com/libs/angularfire/0.9.0/angularfire.min.js",
                      "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js",
                      'node_modules/angular-mocks/angular-mocks.js',
                      'app/scripts/**/*.js',
                      'test/**/*.js'
                      ]
            }
          }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './dist/css/style.css': './app/sass/style.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    './dist/css/style.css': './dist/css/style.css'
                }
            }
        },

        watch: {
            hapi: {
                files: [
                    './app/scripts/**/*.js',
                    './app/sass/**/*.scss',
                    './app/pages/**/*.html',
                    './app/templates/**/*.html',
                    'Gruntfile.js'
                ],
                tasks: [
                    'clean',
                    'browserify',
                    'sass',
                    'autoprefixer',
                    'copy'
                ],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: [ './**/*.png', './**/*.jpg' ],
                    dest: './dist/images',
                    cwd: './app/assets/'
                }, {
                    expand: true,
                    src: [ './**/*.html' ],
                    dest: './dist',
                    cwd: './app/pages/'
                }, {
                    expand: true,
                    src: [ './**/*.html' ],
                    dest: './dist/templates',
                    cwd: './app/templates'
                }]
            }
        },

        hapi: {
            custom_options: {
                options: {
                    server: require('path').resolve('./server'),
                    bases: {
                        '/dist': require('path').resolve('./dist/')
                    }
                }
            }
        },

        clean: ['./dist']
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-hapi');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
};
