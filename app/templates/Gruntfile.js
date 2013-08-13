// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        banner: '/*! <%%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        bower: grunt.file.readJSON('.bowerrc'),

        srcDir: 'src',
        buildDir: 'out',
        jsDir: 'js',
        jsVendorName: 'vendor',
        jsAppName: 'app',
        jsBundleName: 'bundle',
        stylusDir: 'stylus',
        cssDir: 'css',
        cssName: 'main',
        imgDir: 'img',
        fontsDir: 'fonts',<% if (!angular) { %>
        includesDir: 'includes',
        templatesDir: 'templates',<% } else { %>
        viewsDir: 'views',<% } %>

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

        clean: {
            css: {src: '<%%= csso.dist.src %>'},
            js: {src: '<%%= uglify.dist.src %>'},
            img: {src: '<%%= copy.img.dest %>'},<% if (angular) { %>
            views: {src: '<%%= buildDir %>/<%%= viewsDir %>/'},<% } %>
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
            }<% if (angular) { %>,

            views: {
                expand: true,
                cwd: '<%%= srcDir %>/',
                src: ['index.html', '<%%= viewsDir %>/{,*/}*'],
                dest: '<%%= buildDir %>/'
            }<% } %>
        }<% if (!angular) { %>,

        assemble: {
            options: {
                layoutdir: '<%%= srcDir %>/',
                layout: 'layout.hbs',
                partials: ['<%%= srcDir %>/<%%= includesDir %>/*.hbs'],
                flatten: true,
                jsVendorName: '<%%= jsVendorName %>',
                jsAppName: '<%%= jsAppName %>',
                jsBundleName: '<%%= jsBundleName %>'
            },
            dist: {
                options: {
                    debug: grunt.option('debug')
                },
                src: '<%%= srcDir %>/<%%= templatesDir %>/*.hbs',
                dest: '<%%= buildDir %>/'
            }
        }<% } %>,

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
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10']
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
            vendor: {
                src: [<% if (angular) { %>
                    '<%%= bower.directory %>/angular/angular.js',<% } %><% if (jquery) { %>
                    '<%%= bower.directory %>/jquery/jquery.js',<% } %><% if (bpopup) { %>
                    '<%%= bower.directory %>/bpopup/jquery.bpopup.js',<% } %><% if (flexslider) { %>
                    '<%%= bower.directory %>/flexslider/jquery.flexslider.js',<% } %><% if (herotabs) { %>
                    '<%%= bower.directory %>/herotabs/dist/jquery.herotabs.js',<% } %><% if (powertip) { %>
                    '<%%= bower.directory %>/powertip/jquery.powertip.js',<% } %>
                    // More components here
                ],
                dest: '<%%= buildDir %>/<%%= jsDir %>/<%%= jsVendorName %>.js'
            }
        },

        browserify: {
            options: {
                ignore: '<%%= bower.directory %>/'
            },
            dist: {
                options: {
                    debug: grunt.option('debug')
                },
                src: '<%%= srcDir %>/<%%= jsDir %>/{,*/}*.js',
                dest: '<%%= buildDir %>/<%%= jsDir %>/<%%= jsAppName %>.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%%= banner %>'<% if (angular) { %>,
                mangle: false<% } %>
            },
            dist: {
                src: [
                    '<%%= buildDir %>/<%%= jsDir %>/<%%= jsVendorName %>.js',
                    '<%%= buildDir %>/<%%= jsDir %>/<%%= jsAppName %>.js'
                ],
                dest: '<%%= buildDir %>/<%%= jsDir %>/<%%= jsBundleName %>.min.js'
            }
        },<% if (angular) { %>

        usemin: {
            html: '<%%= buildDir %>/index.html'
        },<% } %>

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
                files: [{
                    expand: true,
                    cwd: '<%%= buildDir %>/<%%= imgDir %>/',
                    src: ['{,*/}*.png'],
                    dest: '<%%= buildDir %>/<%%= imgDir %>/'
                }]
            }
        },

        watch: {

            options: {
                livereload: true
            },<% if (angular) { %>

            views: {
                files: ['<%%= srcDir %>/{,*/}*.html'],
                tasks: ['clean:views', 'copy:views']
            },<% } else { %>

            hbs: {
                files: ['<%%= srcDir %>/{,*/}*.hbs'],
                tasks: ['assemble']
            },<% } %>

            stylus: {
                files: ['<%%= srcDir %>/<%%= stylusDir %>/{,*/}*.styl'],
                tasks: ['stylus', 'autoprefixer', 'csslint']
            },

            js: {
                files: ['<%%= srcDir %>/<%%= jsDir %>/{,*/}*', '!<%%= bower.directory %>/{,*/}*'],
                tasks: ['browserify']
            },

            jsVendor: {
                files: ['<%%= bower.directory %>/{,*/}*.js'],
                tasks: ['concat:vendor']
            },

            img: {
                files: ['<%%= srcDir %>/<%%= imgDir %>/{,*/}*'],
                tasks: ['clean:img', 'copy:img', 'sprite']
            },

            fonts: {
                files: ['<%%= srcDir %>/<%%= fontsDir %>/{,*/}*'],
                tasks: ['clean:fonts', 'copy:fonts']
            }
        }

    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);<% if (!angular) { %>
    grunt.loadNpmTasks('assemble');<% } %>

    grunt.registerTask('default', [
        'connect',
        'concat:vendor', 'browserify',<% if (angular) { %>
        'clean:views', 'copy:views',<% } else { %>
        'assemble',<% } %>
        'stylus', 'autoprefixer',
        'watch'
    ]);

    grunt.registerTask('release', [
        'browserify',
        'uglify',<% if (!angular) { %>
        'assemble',<% } %>
        'csso',<% if (angular) { %>
        'usemin',
        'clean:css', 'clean:js',<% } %>
        'pngmin'
    ]);

};
