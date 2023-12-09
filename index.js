require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.get('/', (request, response) => {
  response.send('Hello World!!!!!');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});