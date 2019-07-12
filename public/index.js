require('dotenv').config();
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const cors = require('cors');

const app = express(feathers());

app.configure(express.rest());
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.errorHandler());

const ExchangeListController = require("./controllers/ExchangeListController.js");
app.use('exchange-list', ExchangeListController);
app.post('/add-new-rate', ExchangeListController.addNewRate);
app.get('/list-exchange-rate-tracked', ExchangeListController.listExchangeRateTracked);
app.get('/exchange-list-most-trend', ExchangeListController.exchangeRateTrend);

//index
app.get("/", (req, res) => {
    res.send("Feathers Back-end");
});

const server = app.listen(process.env.APP_PORT);
server.on('listening', () => console.log('Feathers API started at port ' + process.env.APP_PORT));