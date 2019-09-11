const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const curtains = require('./routes/api/curtains');
const curtainsSupliers = require('./routes/api/curtainsSupliers');
const tulles = require('./routes/api/tulles');
const tullesSupliers = require('./routes/api/tullesSupliers');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/atelie', { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/curtains', curtains);
app.use('/api/curtainsSupliers', curtainsSupliers);
app.use('/api/tulles', tulles);
app.use('/api/tullesSupliers', tullesSupliers);

app.use(express.static(path.join(__dirname,'/build')));
app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('../client/build/index.html'));
});

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on ${port}`));