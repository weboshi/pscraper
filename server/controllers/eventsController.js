const db = require("../models");

// Defining methods for the booksController
const controller = {
  findAll: (req, res) => {
    db.Event.findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Event.create({
        name: req.body.name,
        description: req.body.description,
        lineup: req.body.lineup,
        time: req.body.time,
        endtime: req.body.endtime
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Event.update({
        name: req.body.name,
        inactive: req.body.inactive,
        lineup: req.body.lineup,
        time: req.body.time,
        description: req.body.description,
        endtime: req.body.endtime

      }, {
        where: {
          id: req.body.id,
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Event.update({
        inactive: true
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

export { controller as default };