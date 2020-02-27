const http = require('http');
var fs = require('fs');

var data = fs.readFileSync('photo-1499084732479-de2c02d45fc.jpeg');

var crlf = '\r\n',
  boundaryKey = Math.random().toString(16),
  boundary = `--${boundaryKey}`,
  delimeter = `${crlf}--${boundary}`,
  headers = ['Content-Disposition: form-data; name="file"; filename="photo-1499084732479-de2c02d45fc.jpeg"' + crlf],
  closeDelimeter = `${delimeter}--`;

const multipartBody = Buffer.concat([
  new Buffer(delimeter + crlf + headers.join('') + crlf),
  data,
  new Buffer(closeDelimeter),
]);

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/profile',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': multipartBody.length,
  },
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(multipartBody);
req.end();
