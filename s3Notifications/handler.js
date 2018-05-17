'use strict';
const mailer = require('./mailer');
module.exports.s3_notification = (event, context, callback) => {
  // extract s3 data from the event object

  const uploadData = event.Records.map(record => {
    return {
      bucketName: record.s3.bucket.name,
      file: record.s3.object.key,
      fileSize: record.s3.object.size
    }
  })[0];

  mailer
    .generateContent(uploadData)
    .then(content => mailer.sendEmail(content))
    .then((message) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: message
        })
      };
    
      callback(null, response);
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error
        })
      };
    
      callback(null, response);
    });
};
