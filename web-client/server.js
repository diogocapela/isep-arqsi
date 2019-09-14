const path = require('path');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

(() => {
  const port = app.get('port');
  const env = app.get('env');

  app.listen(port, 'localhost', () => {
    console.log(`The server is running at http://localhost:${port} in ${env} mode.`);
    console.log('Press CTRL-C to stop.\n');
  });
})();
