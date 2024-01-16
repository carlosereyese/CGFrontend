const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/your-angular-app-name'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/your-angular-app-name/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
