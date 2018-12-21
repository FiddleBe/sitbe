/*eslint-env node*/
/*global module:false*/
module.exports = function(grunt) {

    var sUser = grunt.option("user"),
        sPwd = grunt.option("pwd");

    grunt.initConfig({

        dir: {
            src: "webapp",
            dest: "dist"
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%= dir.src %>",
                    src: [
                        "**",
                        "!test/**",
                    ],
                    dest: "<%= dir.dest %>"
                }]
            }
        },

        clean: {
            dist: "<%= dir.dest %>/**"
        },
        
        openui5_preload: {
            component: {
                options: {
                    resources: {
                        cwd: "<%= dir.src %>",
                        prefix: "be/fiddle/sitbe",
                        src: [
                            "**/*.js",
                            "**/*.fragment.html",
                            "**/*.fragment.json",
                            "**/*.fragment.xml",
                            "**/*.view.html",
                            "**/*.view.json",
                            "**/*.view.xml",
                            "**/*.properties",
                            "**/*.json",
                            "**/*.css"
                        ]
                    },
                    dest: "<%= dir.dest %>",
                    compress: true
                },
                components: "be/fiddle/sitbe"
            }
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-openui5");

    // Build task
    grunt.registerTask("build", [
        //"openui5_preload", 
        "copy"
    ]);
    // Default task
    grunt.registerTask("default", ["clean", "build"]);
};