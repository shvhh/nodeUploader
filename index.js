var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var directory = 'uploads';
var sendMail = require('./mail');
console.log(JSON.stringify());
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
app.post('/upload', upload.single('file'), async function(req, res, next) {
  await sendMail({
    subject: 'android Build created(PEEKaMEET)',
    to: [
      'rishabh.kataria@unthinkable.co',
      'hemant.rajpoot@unthinkable.co',
      'rupali.joshi@unthinkable.co',
      'bhagyashree.srivastava@daffodilsw.com',
      'akanksha.chaudhary@unthinkable.co',
      'shubham.sharma@unthinkable.co',
      'jasleen.narula@daffodilsw.com',
      'abhishek.kumar@unthinkable.co',
    ],
    html: '<a href="' + 'https://upload-file-node.herokuapp.com/' + req.file.filename + '">Click Here to download</a>',
  });
  return res.send(req.file);
});

app.listen(process.env.PORT || 8000);
