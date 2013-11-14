var path = require('path');
var AWS = require('aws-sdk');

module.exports = function(grunt) {

    var srv = grunt.file.readJSON(path.join(__dirname, 'aws.service.json'));
    var getService = function(name, credentials) {
        var info = srv[name];
        AWS.config.update(credentials);
        AWS.config.apiVersions[name] = info.apiVersion;
        return new AWS[info.namespace];
    };

    grunt.registerMultiTask('aws', function() {
        var credentials = this.options().credentials || {};
        var target = this.target, names = target.split('.');

        var name = names[0], fname = names[1];

        if(!srv[name])
            return grunt.warn('The service "' + name + '" is not supported.');

        var service = getService(name, credentials), fn = service[fname];

        if(typeof fn !== 'function')
            return grunt.warn('No such function "' + fname + '" in ' + name
                + ' service.');

        var done = this.async();
        fn.call(service, this.data || {}, function(err, res) {
            if(err)
                return done(err);
            grunt.event.emit('ok', target, res);
            done();
        });
    });
};
