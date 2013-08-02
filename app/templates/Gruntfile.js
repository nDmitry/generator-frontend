module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        banner: '/*! <%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        bower: grunt.file.readJSON('.bowerrc'),

        srcDir: 'src',
        buildDir: 'out',
        jsDir: 'js',
        jsVendorDir: 'vendor',
        stylusDir: 'stylus',
        cssDir: 'css',
        imgDir: 'img',
        fontsDir: 'fonts',
        includesDir: 'includes',

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
            },

            components: {
                expand: true,
                flatten: true,
                cwd: '<%= bower.directory %>',
                src: [
                    'jquery/jquery.min.js', 'jquery/jquery.min.map',
                    'html5shiv/html5shiv.js',
                    'bpopup/jquery.bpopup.min.js',
                    'flexslider/jquery.flexslider-min.js',
                    'herotabs/jquery.herotabs.min.js',
                    'powertip/jquery.powertip.min.js',
                    // More components here
                ],
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsVendorDir %>/'
            }
        },

        bake: {
            dist: {
                expand: true,
                cwd: '<%= srcDir %>/',
                src: '*.html',
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
                browsers: ['last 1 version', 'ie 8', 'ie 9', 'ie 10']
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
                'duplicate-background-images': false, // because of Spriter
                'font-sizes': false,
                gradients: false,
                important: false,
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
                report: 'min',
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/main.css',
                dest: '<%= buildDir %>/<%= cssDir %>/main.min.css'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%= banner %>',
                sourceMap: '<%= buildDir %>/<%= jsDir %>/app.min.map',
                sourceMappingURL: '/<%= uglify.options.sourceMap %>',
                sourceMapRoot: '/'
            },
            dist: {
                'src': [
                    '<%= srcDir %>/<%= jsDir %>/app.js',
                ],
                'dest': '<%= buildDir %>/<%= jsDir %>/app.min.js'
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

            html: {
                files: ['<%= srcDir %>/*.html', 'src/includes/*.html'],
                tasks: ['bake']
            },

            stylus: {
                files: ['<%= srcDir %>/<%= stylusDir %>/**/*.styl'],
                tasks: ['stylus', 'autoprefixer', 'csslint', 'csso']
            },

            js: {
                files: ['<%= srcDir %>/<%= jsDir %>/**/*.js'],
                tasks: ['uglify']
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

    grunt.registerTask('default', ['connect', 'copy:components', 'bake', 'watch']);
    grunt.registerTask('release', ['pngmin', 'csso', 'compress']);

};
