const mongoose = require("mongoose"),
  enquirySchema = require("../models/enquiry.model");

class EnquiryService {
  constructor() {}
}

EnquiryService.prototype.create = (data) => {
  const contactUs = new enquirySchema({
    _id: new mongoose.Types.ObjectId(),
    name: data.name,
    email: data.email,
    message: data.message,
    contact: data.contact,
    subject: data.subject,
    msgId: data.messageId,
  });
  return contactUs
    .save()
    .then((result) => {
      return result;
    })
    .catch((error) => {});
};
module.exports = new EnquiryService();
