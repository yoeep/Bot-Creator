const axios = require("axios");
const log = require('../../utils/logUtil');

const gpt_url  = require('../../utils/factory').gpt;
const gpt_url_with_callback  = require('../../utils/factory').gpt_with_callback;

module.exports = function (user_id, q, callback, with_callback){
    let data = {};
    let url = gpt_url;
    if (with_callback) {
        url = gpt_url_with_callback;
        data = {
            "msg":user_id + ": " + q,
            "callback":{
                "url": "http://localhost:3000/music",
                "body": {
                },
                "header": {}
            }
        };
    }else{
        data = {
            "msg":user_id + ": " + q
        };
    }
    
    const headers = {
        "Content-Type": "application/json"
    }
    axios.post(url,data)
    .then(a=>{
        callback(a.data);
    })
    .catch(err=>{
        log.error(err);
    })
}

