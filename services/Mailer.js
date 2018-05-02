const sendgrid = require('sendgrid');
const keys = require('../config/keys');
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);

    //helper. Would return list of helper email objects
    this.recipients = this.formatAddresses(recipients);

    //register body as content - addContent from Mail
    this.addContent(this.body);
    //helper to enable sendgrid to update our links wiyth unique links
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    //for every recipient, get email and return it
    //                   (({ES6 destructuring to get email property
    return recipients.map(({ email }) => {
      return new helper.Email(email); //formatting emails
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    //Iterate over all recipients and add each to personalize
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
