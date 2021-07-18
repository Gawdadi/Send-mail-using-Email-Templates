const enquiryService = require("../services/enquiry.service"),
  sendMailService = require("../services/sendMail.service");

class EnquiryController {
  constructor() {}
}

EnquiryController.prototype.create = async (req, res, next) => {
  try {
    const mail = await sendMailService
      .sendMail(req.body)
      .then((result) => {
        return result;
      })
      .catch((error) => {});

    /**
     * Save mail msgId with enquiry data.
     */
    enquiryService
      .create({ ...req.body, messageId: mail.messageId })
      .then((result) => {
        res.status(200).json({
          message: "Mail successsfully send.",
          success: true,
          object: result,
        });
        return result;
      })
      .catch((error) => {});
  } catch (error) {
    res.status(500).json({
      message: "Error",
      object: error,
    });
  }
};

module.exports = new EnquiryController();
