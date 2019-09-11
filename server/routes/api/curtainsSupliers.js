const express = require('express');
const router = express.Router();

const CurtainsSupliers = require('../../models/CurtainsSupliers');

router.get('/test', (req, res) => res.json({msg: "Items Works"}));

router.get('/getAllSupliers', (req, res) => {
  CurtainsSupliers
    .find({})
    .then(items => { res.send(items) })
    .catch(err => console.log(err));
});

router.post('/addCurtainSuplier', (req, res) => {
  CurtainsSupliers
    .findOne({ name: req.body.name })
    .then(item => {
      if(item) {
        return res.status(400).json('Item already exists')
      } else {
        const newItem = new CurtainsSupliers({
          name: req.body.name
        });
          newItem
            .save()
            .then(item => res.json(item))
            .catch(err => console.log(err));
        }
    });
});

router.post('/updateCurtainSuplier', (req, res) => {
  CurtainsSupliers
    .findOne({name: req.body.name})
    .then(curtainSuplier => {
      if(curtainSuplier) {
        return res.status(400).json('Item already exists')
      } else {
        CurtainsSupliers
          .findOne({ name: req.body.id })
          .then(curtainSuplier => {
            curtainSuplier.name = req.body.name;
            curtainSuplier
              .save()
              .then(item => res.json(item))
              .catch(err => console.log(err));
        })
      }
    });
});

router.post('/removeCurtainSuplier', (req, res) => {
  CurtainsSupliers
    .findOne({ name: req.body.name })
    .then(curtainSuplier => {
      curtainSuplier
        .remove()
        .then(item => res.json(item))
        .catch(err => console.log(err));
    })
});

module.exports = router;