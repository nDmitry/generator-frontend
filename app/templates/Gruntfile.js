// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = function(grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        banner: '/*! <%%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        bower: grunt.file.readJSON('.bowerrc'),

        srcDir: 'src',
        buildDir: 'out',
        cssDir: 'css',
        stylusDir: 'stylus',
        jsDir: 'js',
        imgDir: 'img',
        fontsDir: 'fonts',
        pagesDir: 'pages',
        vendorDir: 'vendor',
        cssName: 'main',
        jsVendorName: 'vendor',
        jsAppName: 'app',
        jsBundleName: 'bundle',

        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: grunt.option('port') || 9001,
                    base: './<%%= buildDir %>',
                    livereload: true
                }
            }
        },

        clean: {
            css: {src: '<%%= csso.dist.src %>'},
            js: {src: '<%%= uglify.dist.src %>'},
            img: {src: '<%%= copy.img.dest %>'},
            fonts: {src: '<%%= copy.fonts.dest %>'}
        },

        copy: {
            img: {
                expand: true,
                cwd: '<%%= srcDir %>/<%%= imgDir %>/',
                src: ['{,*/}*'],
                dest: '<%%= buildDir %>/<%%= imgDir %>/'
            },

            fonts: {
                expand: true,
                cwd: '<%%= srcDir %>/<%%= fontsDir %>/',
                src: ['{,*/}*'],
                dest: '<%%= buildDir %>/<%%= fontsDir %>/'
            }
        },

        ejs: {
            options: {
                dev: grunt.option('debug'),
                cssName: '<%%= cssName %>',
                jsVendorName: '<%%= jsVendorName %>',
                jsAppName: '<%%= jsAppName %>',
                jsBundleName: '<%%= jsBundleName %>'
            },
            dist: {
                expand: true,
                ext: '.html',
                flatten: true,
                src: ['<%%= srcDir %>/<%%= pagesDir %>/*.ejs'],
                dest: '<%%= buildDir %>/'
            }
        },

        stylus: {
            dist: {
                options: {
                    compress: false,
                    banner: '<%%= banner %>'
                },
                files: {
                    '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css': '<%%= srcDir %>/<%%= stylusDir %>/index.styl'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 8']
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css',
                dest: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css'
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
                'unqualified-attributes': false,
                'known-properties': false
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css'
            }
        },

        csso: {
            options: {
                report: 'min'
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css',
                dest: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.min.css'
            }
        },

        concat: {
            css_vendor: {
                src: [
                    '<%%= srcDir %>/<%%= cssDir %>/<%%= vendorDir %>/{,*/}*.css',
                    '<%%= concat.css_vendor.dest %>'
                ],
                dest: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css'
            },
            js_vendor: {
                src: [
                    '<%%= bower.directory %>/jquery/jquery.js',
                    // '<%%= bower.directory %>/bpopup/jquery.bpopup.js',
                    // '<%%= bower.directory %>/flexslider/jquery.flexslider.js',
                    // '<%%= bower.directory %>/herotabs/dist/jquery.herotabs.js',
                    // '<%%= bower.directory %>/powertip/jquery.powertip.js',
                    // More components here
                ],
                dest: '<%%= buildDir %>/<%%= jsDir %>/<%%= jsVendorName %>.js'
            }
        },

        browserify: {
            dist: {
                options: {
                    debug: grunt.option('debug')
                },
                src: ['<%%= srcDir %>/<%%= jsDir %>/{,*/}*.js', '!<%%= bower.directory %>/**'],
                dest: '<%%= buildDir %>/<%%= jsDir %>/<%%= jsAppName %>.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%%= banner %>'
            },
            dist: {
                src: [
                    '<%%= buildDir %>/<%%= jsDir %>/<%%= jsVendorName %>.js',
                    '<%%= buildDir %>/<%%= jsDir %>/<%%= jsAppName %>.js'
                ],
                dest: '<%%= buildDir %>/<%%= jsDir %>/<%%= jsBundleName %>.min.js'
            }
        },

        sprite: {
            dist: {
                src: ['<%%= srcDir %>/<%%= imgDir %>/sprites/*'],
                destImg: '<%%= buildDir %>/<%%= imgDir %>/sprite.png',
                destCSS: '<%%= srcDir %>/<%%= stylusDir %>/partials/sprites.styl',
                imgPath: '../<%%= imgDir %>/sprite.png',
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
                expand: true,
                cwd: '<%%= buildDir %>/<%%= imgDir %>/',
                src: ['{,*/}*.png'],
                dest: '<%%= buildDir %>/<%%= imgDir %>/'
            }
        },

        watch: {

            ejs: {
                files: ['<%%= srcDir %>/<%%= pagesDir %>/{,*/}*.ejs'],
                tasks: ['ejs']
            },

            stylus: {
                files: ['<%%= srcDir %>/<%%= stylusDir %>/{,*/}*.styl'],
                tasks: ['stylus', 'csslint', 'concat:css_vendor', 'autoprefixer']
            },

            css_vendor: {
                files: ['<%%= srcDir %>/<%%= cssDir %>/<%%= vendorDir %>/{,*/}*.css'],
                tasks: ['stylus', 'concat:css_vendor', 'autoprefixer']
            },

            js: {
                files: ['<%%= srcDir %>/<%%= jsDir %>/{,*/}*', '!<%%= bower.directory %>/'],
                tasks: ['browserify']
            },

            js_vendor: {
                files: ['<%%= bower.directory %>/{,*/}*.js'],
                tasks: ['concat:js_vendor']
            },

            img: {
                files: ['<%%= srcDir %>/<%%= imgDir %>/{,*/}*'],
                tasks: ['clean:img', 'copy:img', 'sprite']
            },

            fonts: {
                files: ['<%%= srcDir %>/<%%= fontsDir %>/{,*/}*'],
                tasks: ['clean:fonts', 'copy:fonts']
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: ['<%%= buildDir %>/**/*']
            }
        }

    });

    grunt.registerTask('default', [
        'connect',
        'copy',
        'concat:js_vendor', 'browserify',
        'ejs',
        'stylus', 'concat:css_vendor', 'autoprefixer',
        'watch'
    ]);

    grunt.registerTask('release', [
        'browserify',
        'uglify',
        'ejs',
        'csso',
        'clean:css', 'clean:js',
        'pngmin'
    ]);

};
