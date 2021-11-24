const { Comment, validate } = require('../models/comment');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.send(comments);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const comment = new Comment({
            videoId: req.body.videoId,
            text: req.body.text
        });

        await comment.save();

        return res.send(comment);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(req.params.id, 
            {
                videoId: req.body.videoId,
                text: req.body.text
            },
            { new: true }
            );

            if (!comment)
                return res.status(400).send(`The comment with id "${req.params.id}"
                does not exist.`);

            await comment.save();

            return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;