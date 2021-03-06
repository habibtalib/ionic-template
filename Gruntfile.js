'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '**/*.js',
                '!**/*Spec.js',
                '!www/bower_components/**/*.js',
                '!node_modules/**/*.js',
                '!platforms/**/*.js',
                '!plugins/**/*.js',
                '!resources/**/*.js',
                '!build/*.js',
                '!dist/*.js',
                '!coverage/**/*.js',
                '!hooks/**/*.js'
            ]
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: [
                '**/*.js',
                '!**/*Spec.js',
                '!www/bower_components/**/*.js',
                '!node_modules/**/*.js',
                '!platforms/**/*.js',
                '!plugins/**/*.js',
                '!resources/**/*.js',
                '!build/*.js',
                '!dist/*.js',
                '!coverage/**/*.js',
                '!hooks/**/*.js'
            ]
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n',
                separator: '\n',
                sourceMap: true
            },
            dist: {
                src: [
                    'www/core/app.js',
                    'www/core/app.routes.js',
                    'www/**/*.js',
                    '!www/bower_components/**/*.js',
                    '!www/**/*Spec.js'
                ],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */',
                sourceMap: true
            },
            build: {
                src: [
                    'www/core/app.js',
                    'www/core/app.routes.js',
                    'www/**/*.js',
                    '!www/bower_components/**/*.js',
                    '!www/**/*Spec.js'
                ],
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
            },
            concat: {
                src: 'dist/*.js',
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        watch: {
            scripts: {
                files: [
                    'www/**/*.js',
                    '!www/bower_components/**/*.js'
                ],
                tasks: [
                    'concat:dist',
                    'uglify:concat'
                ]
            },
            concat: {
                files: 'dist/*.js',
                tasks: 'uglify:concat'
            },
            validate: {
                files: [
                    '**/*.js',
                    '!www/bower_components/**/*.js',
                    '!node_modules/**/*.js',
                    '!platforms/**/*.js',
                    '!plugins/**/*.js',
                    '!resources/**/*.js',
                    '!build/*.js',
                    '!dist/*.js',
                    '!coverage/**/*.js'
                ],
                tasks: [
                    'jshint:all',
                    'jscs:all'
                ]
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js'
            },
            e2e: {
                keepAlive: true,
                noColor: false,
                args: {
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                autoWatch: true
            },
            singleRun: {
                autoWatch: false,
                singleRun: true,
                browsers: ['Firefox']
            }
        }
    });

    grunt.registerTask('default', ['jshint:all', 'jscs:all', 'karma:singleRun', 'concat', 'uglify:concat']);
};
