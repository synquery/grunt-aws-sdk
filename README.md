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
The `target` object consists of `service`, `method` and `params` properties.  
  
`service`: the name of AWS service.   e.g.) `ec2`, `s3`, `dynamodb`  
`method`: the function name of AWS SDK.  
`params`: the first argument that `method` is called with.  
(See also [AWS SDK document](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html))  

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
    'launchEC2Instance': {
      service: 'ec2',
      method: 'runInstances',
      params: {
        ImageId: 'ami-3f32ac3e', // ubuntu 12.04.3 / 64bit
        MinCount: 1,
        MaxCount: 1,
        KeyName: 'Your Key Pair Name',
        SecurityGroupIds: ['Your Security Group ID'],
        InstanceType: 't1.micro'
      }
    },
    'setName': {
      service: 'ec2',
      method: 'createTags',
      params: {
        Resources: ['<%= aws.data.launchEC2Instance.Instances[0].InstanceId %>'],
        Tags: [{
          Key: 'Name',
          Value: 'Your Instance Name'
        }]
      }
    },
  },
});

grunt.registerTask('launch', ['launchEC2Instance', 'setName']);
```

### Options

#### options.credentials
Type: `Object`
Default value: `{}`

An object value that is used to access to your AWS account.  
You need to prepare Access Keys [here](https://console.aws.amazon.com/iam/home?#security_credential).

#### options.dest
Type: `String`
Default value: `null`

A directory path of `target` response files.  

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
