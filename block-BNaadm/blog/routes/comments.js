var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');
var Article = require('../model/article');

//delete comment
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, comment) => {
        if (err) return next(err);
        Article.findByIdAndUpdate(comment.articleId, {$pull: {comments: comment._id}}, (err, article) => {
            if (err) return next(err);
            res.redirect('/articles/' + article._id);
        });
    });
});

//edit comment
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;
    Comment.findById(id, (err, comment) => {
        if (err) return next(err);
        res.render('commentform', { comment })
    });
});

//update comment
router.post('/:id/edit', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
        if (err) return next(err);
        res.redirect('/articles/' + comment.articleId);
    });
});


//add likes
router.get('/:id/like', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, comment) => {
        if (err) return next(err);
        res.redirect('/articles/' + comment.articleId);
    });
});

//dislike
router.get('/:id/dislike', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, comment) => {
        if (err) return next(err);
        res.redirect('/articles/' + comment.articleId);
    });
});










module.exports = router;
