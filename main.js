const express = require ('express');
const path = require('path');
const app = express();
const port = 8080;
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  var options = {root: path.join(__dirname)}
  res.status(404);
  res.sendFile("./public/404.html", options);

//  res.type('txt').send('Not found');
});


app.param('page', function(req, res, next, name) {
  const modified = name.toLowerCase();
  req.page = modified;
  next();
});

app.get("/:page", function (req, res) {
  var options = {root: path.join(__dirname)}
  if(req.page == null){
    res.sendFile("./public/index.html", options);
  } 
  else{
    res.sendFile("./public/" + req.page + ".html", options);
  } // take url param
  });

app.listen(port, function () {
  console.log(`Nermal listening on port ${port}!`);
});