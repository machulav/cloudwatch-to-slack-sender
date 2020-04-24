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

## Example

### Generated output JSON for Slack

```
{
  "attachments": [
    {
      "fallback": "CloudWatch Alarm: (OK) service-cpu-utilization",
      "color": "good",
      "pretext": "",
      "author_name": "",
      "author_link": "",
      "author_icon": "",
      "title": "service-cpu-utilization",
      "title_link": "https://console.aws.amazon.com/cloudwatch/home?#alarmsV2:alarm/service-cpu-utilization",
      "text": "CPU Utilization monitoring",
      "fields": [
        {
          "title": "Current State",
          "value": "OK",
          "short": true
        },
        {
          "title": "Previous State",
          "value": "INSUFFICIENT_DATA",
          "short": true
        },
        {
          "title": "Reason",
          "value": "Threshold Crossed: no datapoints were received for 15 periods and 15 missing datapoints were treated as [NonBreaching].",
          "short": false
        },
        {
          "title": "Trigger",
          "value": " - Metric name: CPUUtilization \n - Period: 60 \n - Evaluation periods: 15 \n - Comparison operator: GreaterThanOrEqualToThreshold \n - Threshold: 97",
          "short": false
        }
      ],
      "image_url": "",
      "thumb_url": "",
      "footer": "CloudWatch Alarm",
      "footer_icon": "https://raw.githubusercontent.com/machulav/cloudwatch-to-slack-sender/master/img/aws.ico",
      "ts": 1587735634360
    }
  ]
}
```

### Received Slack message

![](/img/slack_example.png)