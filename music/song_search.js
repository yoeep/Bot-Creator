const axios = require("axios");
const factory = require("../utils/factory");
const {search_one,get_play_info,get_play_info_end,headers} = require('../utils/factory')
const sysUtil = require("../utils/sys_util")
const log = require('../utils/logUtil');


module.exports = function (song_name){

    return new Promise((resolve, reject) => {
        log.debug(factory.search_one + encodeURIComponent(song_name));
        axios.get(factory.search_one + encodeURIComponent(song_name), { headers })
            .then(response => {
                log.info(song_name);
                log.info(response.data)
                if(response.data.data.songs){
                    const {id,name,singerName,copyrightId,highlightStr} = response.data.data.songs[0];
                
                    axios.get(factory.get_play_info+copyrightId+get_play_info_end, { headers })
                        .then(response => {
                            const playInfo = response.data;
                            log.debug(playInfo);
                            log.info("https:"+ playInfo.data.playUrl);
                            axios.get("https:"+ playInfo.data.playUrl)
                            .then(response =>{
                                const media = "https:" + playInfo.data.playUrl;
                                resolve({id,name,singerName,media});
                            })
                            .catch(error=>{
                                reject(error);
                            })
                            
                        })
                        .catch(error => {
                            reject(error);
                        });
                }
                
            })
            .catch(error => {
                reject(error);
            });
    });
    
}

