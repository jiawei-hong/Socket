var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

router.get('/registerPage', (req, res) => {
    res.sendFile(`${__dirname}/views/register.html`);
});

router.get('/searchPage', (req, res) => {
    res.sendFile(`${__dirname}/views/search.html`);
})

router.get('/chat', (req, res) => {
    res.sendFile(`${__dirname}/views/chatPage.html`);
});

router.get('/test', (req, res) => {
    res.sendFile(`${__dirname}/views/test.html`);
})

module.exports = router;