const mongoose = require('mongoose');
const Joi = require('joi');

const replySchema = new mongoose.Schema(
    {
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
    }
)

const commentSchema = new mongoose.Schema(
    {
        videoId: {type: String, required: true},
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        replies: {type: [replySchema], default: []}
    }
)

function validateComment(comment) {
    const schema = Joi.object({
        text: Joi.string().required(),
        videoId: Joi.string().required()
    });
    return schema.validate(comment);
}

function validateReply(reply) {
    const schema = Joi.object({
        text: Joi.string().required()
    });
    return schema.validate(reply);
}

const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);

exports.Reply = Reply;
exports.Comment = Comment;
exports.validateComment = validateComment;
exports.validateReply = validateReply;
exports.commentSchema = commentSchema;
exports.replySchema = replySchema;