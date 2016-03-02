var path = require('path');
var AWS = require('aws-sdk');

module.exports = function(grunt) {
  var srv = grunt.file.readJSON(path.join(__dirname, 'aws.service.json'));
  var getService = function(name, credentials) {
    var info = srv[name];
    AWS.config.update(credentials);
    AWS.config.apiVersions[name] = info.apiVersion;
    return new AWS[info.namespace]();
  };

  var response = {};

  grunt.registerMultiTask('aws', function() {

    var target = this.target;
    var data = this.data;
    var options = this.options({
      credentials: {},
      dest: null
    });

    var credentials = options.credentials;
    var sname = data.service, name = sname;
    var fname = data.method, params = data.params || {};

    if(typeof name === 'string') {
      name = name.toLowerCase();
    }

    if(!srv[name]) {
      return grunt.warn('The service "' + sname + '" is not supported.');
    }

    var service = getService(name, credentials), fn = service[fname];

    if(typeof fn !== 'function') {
      return grunt.warn('No such function "' + fname + '" in ' + sname + ' service.');
    }

    grunt.verbose.debug('Request:');
    grunt.verbose.debug(JSON.stringify(params));

    var fncs = name + '.' + fname + '()';
    grunt.verbose.write('Connecting to AWS with ');
    grunt.verbose.write(grunt.log.wordlist([fncs]) + '...');

    var done = this.async();
    fn.call(service, params || {}, function(err, res) {
      if(err) {
        //console.log(err);
        var errStr = JSON.stringify(err);
        if(typeof options.dest === 'string') {
          grunt.file.write(path.join(options.dest, target), errStr);
        }
        if(err.code === 'ResourceAlreadyExistsException' && options.exist) {
          grunt.log.write(err);
        }
        else if(err.message.indexOf('already exists') > -1 && options.exist) {
          grunt.log.write(err);
        } else {
          return done(err);
        }
      } else {
        var str = JSON.stringify(res);
        grunt.verbose.debug('Response:');
        grunt.verbose.debug(str);
        if(typeof options.dest === 'string') {
          grunt.file.write(path.join(options.dest, target), str);
        }
      }
      grunt.verbose.ok();
      response[target] = res;
      done();
    });
  });
};
