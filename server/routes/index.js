const express = require('express');
const router = express.Router();

const transactions = require('../transactions');
const filter = require('lodash/filter');
const map = require('lodash/map');
const uniqBy = require('lodash/uniqBy');

const users = map(uniqBy(transactions, 'id'), (transaction) => ({
  id: transaction.id,
  name: transaction.name,
}));

router.get('/users', (req, res) => {
  res.send({ users });
});

router.get('/transactions/:id', (req, res) => {
  // eslint-disable-next-line eqeqeq
  res.send({
    transactions: filter(transactions, (v) => v.id == req.params.id),
  });
});

module.exports = router;
