const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const vader = require('vader-sentiment');

const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
})

app.post('/vader-analyse', (req, res) => {
    const reply = {};
    const text = req.body.text;
    reply.text = text;
    const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    reply.sentiment = sentiment;

    res.setHeader('Content-Type', 'application/json');
    res.json(reply);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})