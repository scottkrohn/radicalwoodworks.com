import Model from "./model";

class Contact extends Model {
  constructor() {
    super();

    this.data = {
      from: null,
      to: null,
      html: null,
      subject: null,
    };
  }

  // Setters
  setFrom = (from) => {
    this.data.from = from;
  };

  setTo = (to) => {
    this.data.to = to;
  };

  setHtml = (html) => {
    this.data.html = html;
  };

  setSubject = (subject) => {
    this.data.subject = subject;
  };

  // Getters
  getFrom = () => {
    return this.data.from;
  };

  getTo = () => {
    return this.data.to;
  };

  getHtml = () => {
    return this.data.html;
  };

  getSubject = () => {
    return this.data.subject;
  };
}

export default Contact;
