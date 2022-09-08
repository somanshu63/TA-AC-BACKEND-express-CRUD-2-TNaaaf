var express = require('express');
const book = require('../models/book');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('categories')
});

router.get('/fiction', (req, res, next) => {
  console.log('hi')
  book.find({category: "fiction"}, (err, book) => {
    if (err) return next(err);
    res.render('books', {books: book})
  })
});

router.get('/adventure', (req, res, next) => {
  console.log('hi')
  book.find({category: "adventure"}, (err, book) => {
    if (err) return next(err);
    res.render('books', {books: book})
  })
});

router.get('/technology', (req, res, next) => {
  console.log('hi')
  book.find({category: "technology"}, (err, book) => {
    if (err) return next(err);
    res.render('books', {books: book})
  })
});

router.get('/motivation', (req, res, next) => {
  console.log('hi')
  book.find({category: "motivation"}, (err, book) => {
    if (err) return next(err);
    res.render('books', {books: book})
  })
});

module.exports = router;
