const http = require('https');
var fs = require('fs');

const filepath = 'build.zip';
const hostname = 'upload-file-node.herokuapp.com';
var data = fs.readFileSync(filepath);

var crlf = '\r\n',
  boundaryKey = Math.random().toString(16),
  boundary = `--${boundaryKey}`,
  delimeter = `${crlf}--${boundary}`,
  headers = [`Content-Disposition: form-data; name="file"; filename="${filepath.split('/').pop()}"` + crlf],
  closeDelimeter = `${delimeter}--`;

const multipartBody = Buffer.concat([
  Buffer.from(delimeter + crlf + headers.join('') + crlf),
  data,
  Buffer.from(closeDelimeter),
]);

const options = {
  hostname,
  port: 443,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': multipartBody.length,
  },
};

const req = http.request(options, res => {
  let response = '';
  res.on('data', d => {
    response += d;
  });
  res.on('end', () => {
    clearInterval(timeout);
    console.log('https://' + hostname + '/' + JSON.parse(response).filename);
  });
});
req.on('error', error => {
  console.error(error);
});

req.write(multipartBody);

req.end();
let loadingString = 'LOADING';
const timeout = setInterval(() => {
  loadingString += '.';
  console.clear();
  console.log(loadingString);
}, 2000);
