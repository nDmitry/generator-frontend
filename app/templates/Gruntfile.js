module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        banner: '/*! <%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        bower: grunt.file.readJSON('.bowerrc'),

        srcDir: 'src',
        buildDir: 'out',
        jsDir: 'js',
        jsVendorName: 'vendor',
        jsAppName: 'app',
        jsBundleName: 'bundle',
        stylusDir: 'stylus',
        cssDir: 'css',
        imgDir: 'img',
        fontsDir: 'fonts',
        includesDir: 'includes',
        templatesDir: 'templates',

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './',
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        copy: {
            img: {
                expand: true,
                cwd: '<%= srcDir %>/<%= imgDir %>/',
                src: ['**'],
                dest: '<%= buildDir %>/<%= imgDir %>/'
            },

            fonts: {
                expand: true,
                cwd: '<%= srcDir %>/<%= fontsDir %>/',
                src: ['**'],
                dest: '<%= buildDir %>/<%= fontsDir %>/'
            }
        },

        assemble: {
            options: {
                layoutdir: '<%= srcDir %>/',
                layout: 'layout.hbs',
                partials: ['<%= srcDir %>/<%= includesDir %>/*.hbs'],
                flatten: true,
                jsVendorName: '<%= jsVendorName %>',
                jsAppName: '<%= jsAppName %>',
                jsBundleName: '<%= jsBundleName %>'
            },
            dist: {
                options: {
                    debug: grunt.option('debug')
                },
                src: '<%= srcDir %>/<%= templatesDir %>/*.hbs',
                dest: '<%= buildDir %>/'
            }
        },

        stylus: {
            dist: {
                options: {
                    compress: false,
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= buildDir %>/<%= cssDir %>/main.css': '<%= srcDir %>/<%= stylusDir %>/index.styl'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10']
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/main.css',
                dest: '<%= buildDir %>/<%= cssDir %>/main.css'
            }
        },

        csslint: {
            options: {
                'adjoining-classes': false,
                'box-model': false,
                'box-sizing': false,
                'compatible-vendor-prefixes': false,
                'font-sizes': false,
                'gradients': false,
                'important': false,
                'outline-none': false,
                'qualified-headings': false,
                'regex-selectors': false,
                'text-indent': false,
                'unique-headings': false,
                'universal-selector': false,
                'unqualified-attributes': false
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/main.css'
            }
        },

        csso: {
            options: {
                report: 'min'
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/main.css',
                dest: '<%= buildDir %>/<%= cssDir %>/main.min.css'
            }
        },

        concat: {
            vendor: {
                src: [
                    '<%= bower.directory %>/jquery/jquery.js',
                    '<%= bower.directory %>/bpopup/jquery.bpopup.js',
                    '<%= bower.directory %>/flexslider/jquery.flexslider.js',
                    '<%= bower.directory %>/herotabs/dist/jquery.herotabs.js',
                    '<%= bower.directory %>/powertip/jquery.powertip.js',
                    // More components here
                ],
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsVendorName %>.js'
            },
        },

        browserify: {
            options: {
                ignore: '<%= bower.directory %>/**'
            },
            dist: {
                options: {
                    debug: grunt.option('debug')
                },
                src: '<%= srcDir %>/<%= jsDir %>/**/*.js',
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsAppName %>.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%= banner %>'
            },
            dist: {
                src: [
                    '<%= buildDir %>/<%= jsDir %>/<%= jsVendorName %>.js',
                    '<%= buildDir %>/<%= jsDir %>/<%= jsAppName %>.js'
                ],
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsBundleName %>.min.js'
            }
        },

        sprite: {
            dist: {
                src: ['<%= srcDir %>/<%= imgDir %>/sprites/*.png'],
                destImg: '<%= buildDir %>/<%= imgDir %>/sprite.png',
                destCSS: '<%= srcDir %>/<%= stylusDir %>/partials/sprites.styl',
                imgPath: '../<%= imgDir %>/sprite.png',
                algorithm: 'binary-tree',
                padding: 5
            }
        },

        pngmin: {
            dist: {
                options: {
                    binary: '/usr/local/bin/pngquant',
                    ext: '.png',
                    force: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= buildDir %>/<%= imgDir %>/',
                    src: ['**/*.png'],
                    dest: '<%= buildDir %>/<%= imgDir %>/'
                }]
            }
        },

        // Compress `out` directory
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: '<%= buildDir %>.zip'
                },
                files: [{
                    src: ['<%= buildDir %>/**'],
                    dest: '/'
                }]
            }
        },

        watch: {

            options: {
                livereload: true
            },

            hbs: {
                files: ['<%= srcDir %>/**/*.hbs'],
                tasks: ['assemble']
            },

            stylus: {
                files: ['<%= srcDir %>/<%= stylusDir %>/**/*.styl'],
                tasks: ['stylus', 'autoprefixer', 'csslint']
            },

            js: {
                files: ['<%= srcDir %>/<%= jsDir %>/**/*.js'],
                tasks: ['browserify']
            },

            jsVendor: {
                files: ['<%= bower.directory %>/**/*.js'],
                tasks: ['concat:vendor']
            },

            img: {
                files: ['<%= srcDir %>/<%= imgDir %>/**'],
                tasks: ['copy:img', 'sprite']
            },

            fonts: {
                files: ['<%= srcDir %>/<%= fontsDir %>/**'],
                tasks: ['copy:fonts']
            }
        }

    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('default', [
        'connect',
        'concat:vendor', 'browserify',
        'assemble',
        'stylus', 'autoprefixer',
        'watch'
    ]);

    grunt.registerTask('release', [
        'browserify',
        'uglify',
        'assemble',
        'csso',
        'pngmin',
        'compress'
    ]);

};
