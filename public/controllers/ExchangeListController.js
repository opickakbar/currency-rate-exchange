const ExchangeList = require("../models/ExchangeList.js");
const RateList = require("../models/RateList.js");
const Validator = require('feathers-validator');
const moment = require("moment");
const Sequelize = require('sequelize');

const rules_exchange_list =  {
    from: 'required',
    to: 'required'
};

const not_found_message = "Data not found!";

module.exports = {
    async find(params){

        //find all exchange list
        let exchange_lists = await ExchangeList.findAll({
            order : [ ["id", "desc"] ],
            include:[RateList]
        });
        return Promise.resolve({ data: exchange_lists }); 
    },
    async get(id, params){

        //find specific exchange list
        let exchange_list = await ExchangeList.findOne({
            where : {id: id},
            include: [RateList],
        });

        //error handling if data is not found
        if(exchange_list === null) 
            return Promise.resolve({ error : not_found_message });

        //return data exchange
        return Promise.resolve({ data: exchange_list });
    },
    async create(data, params){
        //validation using feathers validator
        let errors = new Validator(data, rules_exchange_list).errors();
        
        //if validation success
        if(Object.keys(errors).length == 0){

            //create new exchange list
            let new_exchange_list = await ExchangeList.create({
                from: data.from,
                to: data.to
            });
            return Promise.resolve({ data: new_exchange_list });
        }

        //if there's any error validation
        Object.keys(errors).forEach((err)=>{ errors[err] = errors[err].message; });
        return Promise.resolve({ errors : errors });
    },
    async remove(id, params){

        //find specific exchange
        let exchange_list = await ExchangeList.findById(id);

        //error handling if data is not valid
        if(exchange_list === null) 
            return Promise.resolve({ error : not_found_message });
        //destroy if data is valid
        return exchange_list.destroy();
    },
    async addNewRate(req, res){
        
        let date = req.body.date;
        let from = req.body.from;
        let to = req.body.to;
        let rate = req.body.rate;

        //check the exchange
        let exchange_list = await ExchangeList.findOne({
            where: {
                from: from,
                to: to
            }
        });
        
        //handling if exchange is not found
        if(exchange_list == null) res.send({error: not_found_message});
        
        //add new rate for the exchange list found
        let new_rate = await RateList.create({
            exchange_list_id: exchange_list.id,
            rate: rate,
            date: date
        });
        
        //return data
        res.send({data: new_rate});
    },
    async listExchangeRateTracked(req, res){
        
        //user params send
        let date = req.query.date;
        
        //get seven days ago from date send
        let seven_days_ago = moment(date).subtract(7,'d').format('YYYY-MM-DD').toString();

        //get all exchange lists where rate 7 days ago
        let exchange_lists = await ExchangeList.findAll({
            include: [
                {
                    model: RateList,
                    order: [["date", "asc"]],
                    date: {
                        [Sequelize.Op.gte]: seven_days_ago
                    }
                }
            ]
        });

        //count average per exchange
        let average = [];
        for(let i = 0; i < exchange_lists.length; i++){
            average[i] = parseFloat(0);
            if(exchange_lists[i].rate_lists.length == 7){
               for(let j = 0; j < exchange_lists[i].rate_lists.length; j++){
                   average[i] += exchange_lists[i].rate_lists[j].rate;
               }
               average[i] /= 7;
            }
            if(average[i] == 0) average[i] = 'insufficient data';
        }

        //set format data to front end
        let data_send = [];
        for(let i = 0; i < exchange_lists.length; i++){
            let exchange = exchange_lists[i];
            let rate = {};
            for(let j = 0; j < exchange_lists[i].rate_lists.length; j++){
                if(date == exchange_lists[i].rate_lists[j].date){
                    rate = exchange_lists[i].rate_lists[j];
                    break;
                }
            }
            let obj =  {
                id: exchange.id,
                from: exchange.from,
                to: exchange.to,
                rate: rate,
                rate_average: average[i]
            };
            data_send.push(obj);
        }

        //return data
        res.send({data: data_send});
    },
    async exchangeRateTrend(req, res){

        //user params send
        let from = req.query.from;
        let to = req.query.to;

        //check exchange list that user want to see (from & to)
        let exchange_list = await ExchangeList.findOne({
            where: {
                from: from,
                to: to
            }
        });

        //handling if null
        if(exchange_list == null) res.send({error: not_found_message});

        //get last 7 data rate
        let rate_lists = await RateList.findAll({
            order: [["id", "desc"]],
            where: {
                exchange_list_id: exchange_list.id
            },
            limit: 7
        });

        //start check the aggregate (minimum, maximum, and average from the last 7 data)
        let minimum = 9999, maximum = 0, total = 0, average = 0;
        for(let i = 0; i < rate_lists.length; i++){
            if(rate_lists[i].rate <= minimum) 
                minimum = rate_lists[i].rate;
            if(rate_lists[i].rate >= maximum) 
                maximum = rate_lists[i].rate;
            total += rate_lists[i].rate;
        }

        average = parseFloat(total/rate_lists.length);
        
        //format data sent to front
        data = {
            variance: parseFloat(maximum - minimum),
            minimum_value: minimum,
            maximum_value: maximum,
            average: average,
            exchange: exchange_list,
            rate_list: rate_lists
        };

        res.send({data: data});
    }
}