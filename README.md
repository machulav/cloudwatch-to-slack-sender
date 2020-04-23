# cloudwatch-to-slack-sender

npm package for sending CloudWatch Alerts from SNS topic to Slack channel

## Installation

```
npm install cloudwatch-to-slack-sender
```

## Usage

AWS Lambda function created by AWS SAM:

```
var slackSender = require('cloudwatch-to-slack-sender');

exports.handler = async (event) => {
  try {
    await slackSender.sendMessageToSlack(event, '<slack_webhook_token>')

    return {
      statusCode: 200
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500
    };
  }
};
```