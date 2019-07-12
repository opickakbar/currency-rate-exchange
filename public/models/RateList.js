const conn = require("../config/connection.js");
const Sequelize = require('sequelize');

const RateList = conn.sequelize.define('rate_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    exchange_list_id: Sequelize.INTEGER,
    rate: Sequelize.FLOAT,
    date: Sequelize.DATE
}, {
    underscored: true,
    timestamps: false,
    freezeTableName: true
});

module.exports = RateList;