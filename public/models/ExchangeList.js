const conn = require("../config/connection.js");
const Sequelize = require('sequelize');
const RateList = require("./RateList");

const ExchangeList = conn.sequelize.define('exchange_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    from: Sequelize.STRING,
    to: Sequelize.STRING
}, {
    underscored: true,
    timestamps: false,
    freezeTableName: true
});

//ORM Relation
ExchangeList.hasMany(RateList);
RateList.belongsTo(ExchangeList);

module.exports = ExchangeList;