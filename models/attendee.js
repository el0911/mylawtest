const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaObj = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);
module.exports = mongoose.model("attendee", schemaObj);
