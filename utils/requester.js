const axios = require('axios');
const factory = require('./factory');
const log = require('./logUtil');
const { error } = require('console');

const headers = {
    "Authorization": factory.botToken
}
module.exports = {

    post:function(path, data){
        return new Promise((resolve,reject)=>{
            axios.post(factory.kook_url.basicUrl + path,data, {headers})
            .then(response=>{
                log.debug(response);
                resolve(response.data);
            })
            .catch(error=>{
                log.error(error);
                reject(error);
            })
        })
    },
    get:function(path){
        return new Promise((resolve,reject)=>{
            axios.get(factory.kook_url.basicUrl + path, {headers})
            .then(response=>{
                log.debug(response);
                resolve(response.data);
            })
            .catch(error=>{
                log.error(error);
                reject(error);
            })
        })
    },
    oldVersion:{
        post:function(path, data){
            return new Promise((resolve,reject)=>{
                axios.post(factory.kook_url.basicUrl_old,data, {headers})
                    .then(response=>{
                        log.debug(response);
                        resolve(response.data);
                    })
                    .catch(error=>{
                        log.error(error);
                        reject(error);
                    })
                })
        },
        get:function(path){
            log.debug(factory.kook_url.basicUrl_old + path);
            log.debug(headers);
            return new Promise((resolve,reject)=>{
                axios.get(factory.kook_url.basicUrl_old + path, {headers})
                .then(response=>{
                    log.debug(response);
                    resolve(response.data);
                })
                .catch(error=>{
                    log.error(error);
                    reject(error);
                })
            })
        }
    }
}