const express = require('express');
const router = express.Router();

const Tulles = require('../../models/Tulles');

router.get('/test', (req, res) => res.json({msg: "Items Works"}));

router.get('/getAllTulles', (req, res) => {
  Tulles
    .find({})
    .then(items => { res.send(items) })
    .catch(err => console.log(err));
});

router.post('/addTulles', (req, res) => {
  Tulles
    .findOne({ name: req.body.name })
    .then(item => {
      if(item) {
        return res.status(400).json('Item already exists')
      } else {
        const newItem = new Tulles({
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

router.post('/reidentificationTulles', (req, res) => {
  Tulles
    .find({ suplier: req.body.suplier })
    .then(Tulles => {
      Tulles.map((tulle, i) => {
        tulle.number = i + 1;
        tulle
          .save()
      })
      res.json(Tulles)
    })
    .catch(err => console.log(err));
});

router.post('/updateTulle', (req, res) => {
  Tulles
    .findOne({name: req.body.name})
    .then(tulle => {
      if(tulle) {
        return res.status(400).json('Item already exists')
      } else {
        Tulles
          .findOne({ name: req.body.id })
          .then(tulle => {
            tulle.name = req.body.name? req.body.name : tulle.name;
            tulle.suplier = req.body.suplier? req.body.suplier: tulle.suplier;
            tulle.length = req.body.length? req.body.length: tulle.length;
            tulle.high = req.body.high? req.body.high: tulle.high;
            tulle.inputPrice = req.body.inputPrice? req.body.inputPrice: tulle.inputPrice;
            tulle.outputPrice = req.body.outputPrice? req.body.outputPrice: tulle.outputPrice;
            tulle.inputSummary = tulle.length && tulle.inputPrice? parseFloat(tulle.length * tulle.inputPrice).toFixed(2) : 0;
            tulle.outputSummary = tulle.length && tulle.outputPrice? parseFloat(tulle.length * tulle.outputPrice).toFixed(2) : 0;
            tulle.number = tulle.number;
            tulle.type = tulle.type;
            tulle
              .save()
              .then(item => res.json(item))
              .catch(err => console.log(err));
          })
        }
    });
})

router.post('/removeTulles', (req, res) => {
  const arr = Array.from(req.body.namesArray);
  Tulles
    .deleteMany({ name: { $in: [...arr] }})
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get('/getTullesWithName', (req, res) => {
  Tulles
    .find({ name: {$regex : `.*${req.query.name}.*`}})
    .then(items => res.send(items))
    .catch(err => console.log(err));
});

module.exports = router;