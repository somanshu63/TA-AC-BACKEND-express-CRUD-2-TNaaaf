var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');
const { json } = require('express');

//list all books
router.get('/', function(req, res, next) {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('books', {books: books});
  });
});

//get book form
router.get('/new', (req, res) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    res.render('bookform', {authors});
  });
});

//get single book
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    Author.findById(book.authorId, (err, author) => {
      if (err) return next(err);
      res.render('singleBook', {book, author});
    });
  });
});

//add new book
router.post('/', (req, res, next) => {
  req.body.category = req.body.category.split(' ');
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    Author.findByIdAndUpdate(req.body.authorId, {$push: {bookId: book.id}}, (err, author) => {
      if (err) return next(err);
      res.redirect('/books');
    });
  });
});

//delete book
router.get('/:id/delete', (req, res) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if(err) return next(err);
    Author.findByIdAndUpdate(book.authorId, {$pull: {bookId: id}}, (err, author) => {
      if(err) return next(err);
      res.redirect('/books');
    });
  });
});

//open author update form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
      if (err) return next(err);
      book.category = book.category.join(" ");
      Author.find({}, (err, authors) => {
        if (err) return next(err);
        res.render('updateform', {book, authors})
      });
  });
});

//update author
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  req.body.category = req.body.category.split(' ');
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
      if (err) return next(err);
      res.redirect('/books/' + id);
  });
});

module.exports = router;
