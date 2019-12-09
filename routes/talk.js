const express = require("express");
const router = express.Router();
const model = require("../models/talk");
const modelAttendeeTalk = require("../models/talkAttendeea");
const attendee = require("../models/attendee");

const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),

  time: Joi.string().required()
});

const schemaAttend = Joi.object({
  talkId: Joi.string().required(),

  attendeeEmail: Joi.string().required()
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

router.post("/attendee", async (req, res) => {
  const data = req.body;

  try {
    await schemaAttend.validateAsync(data);
  } catch ({ details }) {
    return res.status(400).json({
      message: generateError(details)
    });
  }

  try {
    const checkmail = attendee.findOne({
      email: data.email
    }); ///check if user exist

    if (!checkmail) {
      return res.status(400).json({
        message: "an error occured saving data"
      });
    }

    await modelAttendeeTalk.create(data);
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

router.get("/attendee", async (req, res) => {
  const data = req.query;
  try {
    return res.json({
      data: await modelAttendeeTalk.find({
        talkId: data.talkId
      })
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured when getting data"
    }); 
  }
});


router.post("/cancel", async (req, res) => {
 
  
  const data = req.body;
 
  try {

    await model.findByIdAndDelete(data.talkId)
    return res.json({
      status:true
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured when removing data"
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
  