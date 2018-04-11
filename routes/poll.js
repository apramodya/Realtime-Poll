const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '507703',
    key: '3397f9d44a6c93f507e3',
    secret: '44100e9994357be2086c',
    cluster: 'ap2',
    encrypted: true
});


router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes: votes
    }));
});

router.post('/', (req, res) => {
    // save to db
    const newVote = {
        os: req.body.os,
        points: 1
    }
    new Vote(newVote).save().then( vote => {
        // trigger
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });

        return res.json({
            success: true,
            message: 'Thank you for voting'
        });
    });

});

module.exports = router;