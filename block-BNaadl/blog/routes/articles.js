var express = require('express');
var router = express.Router();
var Article = require('../model/article');

/* GET articles listing. */

router.get('/new', (req, res) => {
  console.log('hi')
  res.render('form');
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if(err) return next(err);
    res.render('singleArticle', { article })
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if(err) return next(err);
    res.render('updateform', { article })
  });
});

router.post('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if(err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id/addlike/:likes', (req, res, next) => {
  var id = req.params.id;
  var likes = Number(req.params.likes);
  Article.findByIdAndUpdate(id, {likes: likes+1}, {upsert: true}, (err, updatedarticle) => {
    if(err) return next(err);
    res.redirect(`/articles/${id}`);
  });
});

router.get('/:id/sublike/:likes', (req, res, next) => {
  var id = req.params.id;
  var likes = Number(req.params.likes);
  Article.findByIdAndUpdate(id, {likes: likes-1}, {upsert: true}, (err, updatedarticle) => {
    if(err) return next(err);
    res.redirect(`/articles/${id}`);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if(err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/', function(req, res, next) {
  Article.find({}, (err, articles) => {
    if(err) return next(err);
    res.render('articles', {articlesList: articles})
  });
});

router.post('/', (req, res) => {
  Article.create(req.body, (err, capturedarticle) => {
    if(err) res.redirect('/articles/new');
        res.redirect(`articles`);
  });
});

module.exports = router;
