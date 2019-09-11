const express = require('express');
const router = express.Router();

const TullesSupliers = require('../../models/TullesSupliers');

router.get('/test', (req, res) => res.json({msg: "Items Works"}));

router.get('/getAllSupliers', (req, res) => {
  TullesSupliers
    .find({})
    .then(items => { res.send(items) })
    .catch(err => console.log(err));
});

router.post('/addTullesSuplier', (req, res) => {
  TullesSupliers
    .findOne({ name: req.body.name })
    .then(item => {
      if(item) {
        return res.status(400).json('Item already exists')
      } else {
        const newItem = new TullesSupliers({
          name: req.body.name
        });
          newItem
            .save()
            .then(item => res.json(item))
            .catch(err => console.log(err));
        }
    });
});

router.post('/updateTullesSuplier', (req, res) => {
  TullesSupliers
    .findOne({name: req.body.name})
    .then(tullesSuplier => {
      if(tullesSuplier) {
        return res.status(400).json('Item already exists')
      } else {
        TullesSupliers
          .findOne({ name: req.body.id })
          .then(tullesSuplier => {
            tullesSuplier.name = req.body.name;
            tullesSuplier
              .save()
              .then(item => res.json(item))
              .catch(err => console.log(err));
        })
      }
    });
});

router.post('/removeTullesSuplier', (req, res) => {
  TullesSupliers
    .findOne({ name: req.body.name })
    .then(tullesSuplier => {
      tullesSuplier
        .remove()
        .then(item => res.json(item))
        .catch(err => console.log(err));
    })
});

module.exports = router;