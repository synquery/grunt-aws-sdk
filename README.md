# grunt-aws-sdk

> The bridge between `grunt` and `aws-sdk`. This moudle allows you to call AWS APIs as grunt tasks.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-aws-sdk --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-aws-sdk');
```

## The "aws" task

### Overview
In your project's Gruntfile, add a section named `aws` to the data object passed into `grunt.initConfig()`.  
The key of `target` is a string which consists of `service name` and `method name`, and the value is the first argument of the method. (See also [AWS SDK document](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html))  

```js
grunt.initConfig({
  aws: {
    options: {
      credentials: {
        accessKeyId: 'Your Access Key ID',
        secretAccessKey: 'Your Secret Access Key',
        region: 'ap-northeast-1'
      }
    },
    's3.copyObject': {
      Bucket: '...',
      CopySource: '...',
      Key: '...'
    },
    'ec2.describeInstances': {
      InstanceIds: ['...', '...']
    },
  },
})
```

### Options

#### options.credentials
Type: `Object`
Default value: `{}`

An object value that is used to access to your AWS account.  
You need to prepare Access Keys [here](https://console.aws.amazon.com/iam/home?#security_credential).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
