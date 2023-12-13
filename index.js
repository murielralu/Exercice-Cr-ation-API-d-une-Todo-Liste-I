require('dotenv').config();

const express = require('express');
const cors = require('cors');

const router = require("./back/app/router");

const app = express();
const port = 3006;


app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});