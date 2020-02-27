var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var directory = 'uploads';

console.log(JSON.stringify(process.env));
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, directory);
  },
  filename: function(req, file, cb) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlinkSync(path.join(directory, file));
      }
    });
    cb(null, file.originalname);
  },
});
var upload = multer({ storage });

var app = express();
app.use(express.static(directory));
app.post('/upload', upload.single('file'), function(req, res, next) {
  res.send(req.file);
});

app.listen(process.env.PORT || 8000);
