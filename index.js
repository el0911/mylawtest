require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(
  cors()
);

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
  })
  .then(() => {
    console.log(
      "============Welcome Mr Stark===========\n you are now connected to the database"
    );
  })
  .catch(err => {
    console.error(err);
  });


  const talk = require('./routes/talk');
  const attendee = require('./routes/attendee');


  //==========================routes=======================
const router = express.Router();
router.use('/talk',talk);
router.use('/attendee',attendee);

app.use('/api', router);


app.listen(process.env.PORT || 3000, () => {
	console.log(`Server now listening at localhost:${process.env.PORT || 3000}`);
});