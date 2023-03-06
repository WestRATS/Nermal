const express = require ('express');
const path = require('path');
const app = express();
const port = 8080;
app.use(express.static(path.join(__dirname, 'public')));

app.get("/login", function (req, res) {
  var options = {
    root: path.join(__dirname)
  }
  res.sendFile("./public/login.html", options);
});

app.listen(port, function () {
  console.log(`Nermal listening on port ${port}!`);
});