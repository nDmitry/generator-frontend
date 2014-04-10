// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = function(grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        banner: '/*! <%%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',

        componentsDir: 'bower_components',
        buildDir: 'dist',
        cssDir: 'css',
        sassDir: 'sass',
        jsDir: 'js',
        imgDir: 'img',
        fontsDir: 'fonts',
        pagesDir: 'pages',

        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: grunt.option('port') || 9001,
                    base: ['<%%= buildDir %>/', './'],
                    livereload: true
                }
            }
        },

        clean: {
            build: {src: '<%%= buildDir %>/'},
            css: {src: '<%%= buildDir %>/<%%= cssDir %>/main.css'},
            tmp: {src: '.tmp/'}
        },

        copy: {
            img: {
                src: '<%%= imgDir %>/**',
                dest: '<%%= buildDir %>/'
            },

            fonts: {
                src: '<%%= fontsDir %>/{,*/}*.{eot,otf,svg,ttf,woff}',
                dest: '<%%= buildDir %>/'
            },

            js: {
                src: '<%%= jsDir %>/**',
                dest: '<%%= buildDir %>/'
            }
        },

        ejs: {
            dist: {
                expand: true,
                flatten: true,
                ext: '.html',
                src: '<%%= pagesDir %>/*.ejs',
                dest: '<%%= buildDir %>/'
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/main.css'
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
                'regex-selectors': false,
                'universal-selector': false,
                'unqualified-attributes': false,
                'bulletproof-font-face': false,
                'unique-headings': false
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/main.css'
            }
        },

        cssmin: {
            options: {
                banner: '<%%= banner %>',
                report: 'min'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%%= banner %>'
            }
        },

        useminPrepare: {
            options: {
                root: ['./', '<%%= buildDir %>/']
            },
            html: '<%%= buildDir %>/index.html'
        },

        usemin: {
            html: '<%%= buildDir %>/*.html',
        },

        filerev: {
            options: {
                length: 4
            },
            dist: {
                src: [
                    '<%%= buildDir %>/<%%= cssDir %>/main.css',
                    '<%%= buildDir %>/<%%= jsDir %>/app.js'
                ]
            }
        },

        imagemin: {
            options: {
                pngquant: true
            },
            dist: {
                expand: true,
                cwd: '<%%= buildDir %>/<%%= imgDir %>/',
                src: ['{,*/}*.{png,jpg,jpeg,gif}'],
                dest: '<%%= buildDir %>/<%%= imgDir %>/'
            }
        },

        compress: {
            dist: {
                options: {
                    archive: '<%%= buildDir %>.zip'
                },
                expand: true,
                cwd: '<%%= buildDir %>/',
                src: ['**', '../<%%= componentsDir %>/**', '../bower.json'],
                dest: './'
            },
            min: {
                options: {
                    archive: '<%%= buildDir %>.zip'
                },
                expand: true,
                cwd: '<%%= buildDir %>/',
                src: '**',
                dest: './'
            }
        },

        photobox: {
            task: {
                options: {
                    indexPath: 'regression/',
                    template: 'canvas',
                    screenSizes: ['1280'],
                    urls: [
                        'http://localhost:9001',
                    ]
                }
            }
        },

        watch: {
            ejs: {
                files: ['<%%= pagesDir %>/{,*/}*.ejs'],
                tasks: ['ejs']
            },

            sass: {
                files: ['<%%= sassDir %>/**/*.scss'],
                tasks: ['compass', 'autoprefixer']
            },

            livereload: {
                options: {
                    livereload: true,
                },
                files: [
                    '<%%= buildDir %>/**',
                    '<%%= copy.img.src %>',
                    '<%%= copy.fonts.src %>',
                    '<%%= copy.js.src %>'
                ]
            }
        }

    });

    // Compile all files that should be compiled
    grunt.registerTask('build', [
        'clean:build',
        'ejs',
        'compass',
        'autoprefixer'
    ]);

    // Create non-minified project snapshot in build directory and compress it to zip
    grunt.registerTask('dist', [
        'build',
        'copy',
        'imagemin',
        'photobox',
        'compress:dist'
    ]);

    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('lint', [
        'csslint'
    ]);

    // Minify all JS and CSS, optimize images, rev JS and CSS and replace paths in HTML
    grunt.registerTask('minify', [
        'build',
        'copy:img', 'copy:fonts',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'imagemin',
        'clean:css',
        'compress:min',
        'clean:tmp'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
