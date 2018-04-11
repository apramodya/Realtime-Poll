const express = require('express');
const router = express.Router();

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '507703',
    key: '3397f9d44a6c93f507e3',
    secret: '44100e9994357be2086c',
    cluster: 'ap2',
    encrypted: true
});


router.get('/', (req, res) => {
    res.send('POLL');
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });

    return res.json({
        success: true,
        message: 'Thank you for voting'
    });
});

module.exports = router;