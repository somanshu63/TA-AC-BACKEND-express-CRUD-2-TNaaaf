var express = require('express');
var router = express.Router();
var Article = require('../model/article');
var Comment = require('../model/comment');

/* GET articles listing. */
//create article form
router.get('/new', (req, res) => {
  console.log('hi')
  res.render('form');
});

//show single article older method
// router.get('/:id', function(req, res, next) {
//   var id = req.params.id;
//   Article.findById(id, (err, article) => {
//     if(err) return next(err);
//     Comment.find({articleId : id}, (err, comments) => {
//       if(err) return next(err);
//       res.render('singleArticle', {article, comments})
//     });
//   });
// });

//show single article and respective comments
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id).populate('comments').exec((err, article) => {
    if(err) return next(err);
    res.render('singleArticle', {article: article });
  });
});

//get article form to update
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    article.tags = article.tags.join(' ');
    if(err) return next(err);
    res.render('updateform', { article })
  });
});

//add comment
router.post('/:id/comment', (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if(err) return next(err);
    Article.findByIdAndUpdate(id, {$push: {comments: comment._id}}, (err, article) => {
      if(err) return next(err);
      res.redirect('/articles/' + id);
    });
  });
});

//update article
router.post('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.trim().split(' ');
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if(err) return next(err);
    res.redirect('/articles');
  });
});

//addlikes
router.get('/:id/addlike/:likes', (req, res, next) => {
  var id = req.params.id;
  var likes = Number(req.params.likes);
  Article.findByIdAndUpdate(id, {likes: likes+1}, {upsert: true}, (err, updatedarticle) => {
    if(err) return next(err);
    res.redirect(`/articles/${id}`);
  });
});

//sublikes
router.get('/:id/sublike/:likes', (req, res, next) => {
  var id = req.params.id;
  var likes = Number(req.params.likes);
  Article.findByIdAndUpdate(id, {likes: likes-1}, {upsert: true}, (err, updatedarticle) => {
    if(err) return next(err);
    res.redirect(`/articles/${id}`);
  });
});

//delete article
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if(err) return next(err);
    Comment.deleteMany({articleId: id}, (err, comment) => {
      if(err) return next(err);
      res.redirect('/articles');
    });
  });
});

//list all articles
router.get('/', function(req, res, next) {
  Article.find({}, (err, articles) => {
    if(err) return next(err);
    res.render('articles', {articlesList: articles})
  });
});

//create article
router.post('/', (req, res) => {
  req.body.tags = req.body.tags.trim().split(' ');
  Article.create(req.body, (err, capturedarticle) => {
    if(err) res.redirect('/articles/new');
        res.redirect(`articles`);
  });
});

module.exports = router;
