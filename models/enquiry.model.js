const mongoose = require("mongoose"),
  schema = mongoose.Schema;

const EnquirySchema = new schema(
  {
    _id: schema.Types.ObjectId,
    contact: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
    subject: {
      required: true,
      type: String,
    },
    msgId: {
      required: true,
      type: String,
    },
  },
  { timestamps: true, collection: "enquiries" }
);

module.exports = mongoose.model("enquiry", EnquirySchema);
