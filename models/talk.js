const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaObj = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true,
      ref: "Blog"
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

module.exports = mongoose.model("talk", schemaObj);
