const axios = require("axios");
const log = require('../../utils/logUtil');

const gpt_url  = require('../../utils/factory').gpt;

module.exports = function (q, callback){
    const data = {
        "msg":q
    };
    const headers = {
        "Content-Type": "application/json"
    }
    axios.post(gpt_url,data)
    .then(a=>{
        callback(a.data);
    })
    .catch(err=>{
        log.error(err);
    })
}
