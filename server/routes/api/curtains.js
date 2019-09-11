const express = require('express');
const router = express.Router();

const Curtains = require('../../models/Curtains');

router.get('/test', (req, res) => res.json({msg: "Items Works"}));

router.get('/getAllCurtains', (req, res) => {
  Curtains
    .find({})
    .then(items => { res.send(items) })
    .catch(err => console.log(err));
});

router.post('/addCurtains', (req, res) => {
  Curtains
    .findOne({ name: req.body.name })
    .then(item => {
      if(item) {
        return res.status(400).json('Item already exists')
      } else {
        const newItem = new Curtains({
          name: req.body.name,
          suplier: req.body.suplier,
          type: req.body.type,
        });
        newItem.length = req.body.length? req.body.length: 0;
        newItem.high = req.body.high? req.body.high: 0;
        newItem.inputPrice = req.body.inputPrice? req.body.inputPrice: 0;
        newItem.outputPrice = req.body.outputPrice? req.body.outputPrice: 0;
        newItem.inputSummary = req.body.length && req.body.inputPrice? parseFloat(req.body.length * req.body.inputPrice).toFixed(2): 0;
        newItem.outputSummary = req.body.length && req.body.outputPrice? parseFloat(req.body.length * req.body.outputPrice).toFixed(2): 0;
        newItem
          .save()
          .then(item => res.json(item))
          .catch(err => console.log(err));
        }
    });
});

router.post('/reidentificationCurtains', (req, res) => {
  Curtains
    .find({ suplier: req.body.suplier })
    .then(curtains => {
      curtains.map((curtain, i) => {
        curtain.number = i + 1;
        curtain
          .save()
      })
      res.json(curtains)
    })
    .catch(err => console.log(err));
});

router.post('/updateCurtain', (req, res) => {
  Curtains
    .findOne({name: req.body.name})
    .then(curtain => {
      if(curtain) {
        return res.status(400).json('Item already exists')
      } else {
        Curtains
          .findOne({ name: req.body.id })
          .then(curtain => {
            curtain.name = req.body.name? req.body.name : curtain.name;
            curtain.suplier = req.body.suplier? req.body.suplier: curtain.suplier;
            curtain.length = req.body.length? req.body.length: curtain.length;
            curtain.high = req.body.high? req.body.high: curtain.high;
            curtain.inputPrice = req.body.inputPrice? req.body.inputPrice: curtain.inputPrice;
            curtain.outputPrice = req.body.outputPrice? req.body.outputPrice: curtain.outputPrice;
            curtain.inputSummary = curtain.length && curtain.inputPrice? parseFloat(curtain.length * curtain.inputPrice).toFixed(2): 0;
            curtain.outputSummary = curtain.length && curtain.outputPrice? parseFloat(curtain.length * curtain.outputPrice).toFixed(2): 0;
            curtain.number = curtain.number;
            curtain.type = curtain.type;
            curtain
              .save()
              .then(item => res.json(item))
              .catch(err => console.log(err));
        })
      }
    });
})

router.post('/removeCurtains', (req, res) => {
  const arr = Array.from(req.body.namesArray);
  Curtains
    .deleteMany({ name: { $in: [...arr] }})
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get('/getCurtainsWithName', (req, res) => {
  Curtains
    .find({ name: {$regex : `.*${req.query.name}.*`}})
    .then(items => res.send(items))
    .catch(err => console.log(err));
});

module.exports = router;