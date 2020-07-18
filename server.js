const express = require('express');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};

app.use(express.static('./dist/vndreamers-frontend'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/vndreamers-frontend'});
});
app.use(forceSSL());
app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)
