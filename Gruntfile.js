
module.exports = function(grunt) {
  
  grunt.registerTask('writeGood', function (){
    var conf = grunt.config.get('writeGood');
    var util = require('util');
    var exec = require('child_process').exec;
    var next = grunt.task.current.async();
    var done = 0;
    conf.patterns.forEach(function(){
      var pattern = 'node_modules/write-good/bin/write-good.js %s %s'
      var command = util.format(pattern, arguments[0], conf.switches || '');
      exec(command, function (error, stdout, stderr) {
        grunt.log.writeln('stdout: ' + stdout);
        grunt.log.writeln('stderr: ' + stderr);
        if (++done === conf.patterns.length) {
          next(error);
        }
      });
    });
  });
  grunt.config('writeGood',{
    patterns: ['*.md'],
    switches: ''
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch',{
    docs: {
      files: '<%= writeGood.patterns %>',
      tasks: ['writeGood']
    }
  });
  
  grunt.registerTask('default', ['writeGood']);
};