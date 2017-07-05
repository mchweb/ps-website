module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'assets/js/main.js',
                dest: 'assets/js/main.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'prod/assets/img/'
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'assets/css'
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    'prod/index.html': ['index.html']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['favicon.ico'], dest: 'prod/', filter: 'isFile'},
                    {expand: true, src: ['assets/js/main.min.js'], dest: 'prod/', filter: 'isFile'},
                    {expand: true, src: ['assets/js/vendor/*'], dest: 'prod/', filter: 'isFile'},
					{expand: true, src: ['assets/img/*.svg'], dest: 'prod/', filter: 'isFile'},
                    {expand: true, src: ['assets/css/*.css'], dest: 'prod/', filter: 'isFile'}
                ],
            },
        },
        inlineImgSize: {
            files: {
                src: ['index.html', 'bar.html', 'contacts.html', 'space.html']
            }
        },
        postcss: {
            options: {
                map: false, 
                processors: [
                    //require('css-mqpacker')(),
                    require('postcss-focus')(),
                    require('autoprefixer')({browsers: '> 1%, last 2 versions'}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'assets/css/*.css'
            }
        },
          uncss: {
            dist: {
                files: {
                    'prod/assets/css/screen.css': ['soon.html']
                }
            }
        }        
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-inline-imgsize');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-uncss');

    grunt.registerTask('default', ['postcss', 'uglify', 'imagemin', 'processhtml']);

};