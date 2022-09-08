var express = require('express');
const author = require('../models/author');
var router = express.Router();
var Author = require('../models/author');
var Book = require('../models/book');


//list authors
router.get('/', function(req, res, next) {
  Author.find({}, (err, authors) => {
    res.render('authors', {authors: authors})
  });
});

//get author form
router.get('/new', function(req, res, next) {
    res.render('authorform');
});

//get single author
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Author.findById((id), (err, author) => {
        if(err) return next(err);
        Book.find({authorId: id}, (err, books) => {
            if(err) return next(err);
            res.render('singleauthor', {author, books})
        });
    });
  });

  //add author
router.post('/', (req, res, next) => {
  Author.create(req.body, (err, author) => {
    if (err) return next(err);
    res.redirect('/authors')
  })
});

//delete author
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Author.findByIdAndDelete(id, (err, author) => {
        if (err) return next(err);
        Book.findOneAndDelete({authorId: id}, (err, book) => {
            if (err) return next(err);
            res.redirect('/authors');
        });
    });
});

//open author update form
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;
    Author.findById(id, (err, author) => {
        if (err) return next(err);
        res.render('updateauthorform', {author})
    });
});

//update author
router.post('/:id', (req, res, next) => {
    var id = req.params.id;
    Author.findByIdAndUpdate(id, req.body, (err, author) => {
        if (err) return next(err);
        res.redirect('/authors/' + id);
    });
});


module.exports = router;
