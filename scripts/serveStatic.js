const path = require('path');
const express = require('express');
const app = express();

const root = path.resolve(__dirname, '../');

app.use(
  express.static(
    path.join(root, 'dist/build')
  )
);



app.listen(8080, function () {
  console.log('serving static files port 8080!')
})
