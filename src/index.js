const axios = require('axios');

async function sendAlarm(snsEvent, slackWebhookToken) {
  var message = JSON.parse(snsEvent.Records[0].Sns.Message);

  var slackConfig = {
    attachments: [{
      fallback: `CloudWatch Alarm: (${message.NewStateValue}) ${message.AlarmName}`,
      color: getColor(message.NewStateValue),
      pretext: '',
      author_name: '',
      author_link: '',
      author_icon: '',
      title: message.AlarmName,
      title_link: `https://console.aws.amazon.com/cloudwatch/home?#alarmsV2:alarm/${message.AlarmName}`,
      text: message.AlarmDescription,
      fields: [{
          title: 'Current State',
          value: message.NewStateValue,
          short: true
        },
        {
          title: 'Previous State',
          value: message.OldStateValue,
          short: true
        },
        {
          title: 'Reason',
          value: message.NewStateReason,
          short: false
        },
        {
          title: 'Trigger',
          value: ` - Metric name: ${message.Trigger.MetricName} \n - Period: ${message.Trigger.Period} \n - Evaluation periods: ${message.Trigger.EvaluationPeriods} \n - Comparison operator: ${message.Trigger.ComparisonOperator} \n - Threshold: ${message.Trigger.Threshold}`,
          short: false
        }
      ],
      image_url: '',
      thumb_url: '',
      footer: 'CloudWatch Alarm',
      footer_icon: 'https://raw.githubusercontent.com/machulav/cloudwatch-to-slack-sender/master/img/aws.ico',
      ts: new Date(message.StateChangeTime).getTime()
    }]
  };

  return await axios.post('https://hooks.slack.com/services/' + slackWebhookToken, slackConfig);
}

function getColor(messageState) {
  var color;

  switch (messageState) {
    case "OK":
      color = 'good';
      break;
    case "ALARM":
      color = 'danger';
      break;
    default:
      color = 'warning';
  }

  return color;
}

module.exports = {
  sendAlarm
}