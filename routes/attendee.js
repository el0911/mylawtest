const express = require("express");
const router = express.Router();
const model = require("../models/attendee");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
  email: Joi.string().email()
});
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    await schema.validateAsync(data);
  } catch ({ details }) {
    return res.status(400).json({
      message: generateError(details)
    });
  }

  try {
    let existingUser = await model.findOne({ email: data.email });
    if (existingUser) throw new Error("This email has already been used");
    await model.create(data);
    return res.json({
      status: true
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "an error occured saving data"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    return res.json({
      data: await model.find()
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured when getting data"
    });
  }
});

const generateError = err => {
  let message = "";
  for (let i = 0; i < err.length; i++) {
    const element = err[i];
    message = `${message} * ${element.message}  \n`;
  }

  return message;
};
module.exports = router;
