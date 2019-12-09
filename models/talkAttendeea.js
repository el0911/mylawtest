const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaObj = new Schema(
  {
    talkId: {
      type: String,
      required: true,
      ref: "talk"
    },

    attendeeEmail: {
      type: String,
      required: true,
      ref: "attendee"
    },

     },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);
// todo: add useful model methods

module.exports = mongoose.model("talkAttendees", schemaObj);
