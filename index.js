require('dotenv').config();

const express = require('express');
const cors = require('cors');

const router = require("./app/router");

const bodySanitizer = require('./middlewares/body-sanitizer.js').bodySanitizer;

const app = express();
const port = 3000;


app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodySanitizer);

app.use(router);



app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});