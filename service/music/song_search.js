const axios = require("axios");
const log = require('../../utils/logUtil');

const { search_url,to_add_url,download_song_url,download_song_url1 ,headers, headers1 }  = require('../../utils/factory').migu;

module.exports = function (song_name){
    return new Promise((resolve, reject) => {
        log.info(song_name);
        axios.get(search_url.replace("{text}",song_name) + to_add_url, { headers })
            .then(response => {
                if(response.data && response.data.code == "000000" && response.data.songResultData 
                    && response.data.songResultData.result && response.data.songResultData.result.length >0){
                    log.info(response.data.songResultData.result[0]);
                    const contentId = response.data.songResultData.result[0].contentId;
                    const copyrightId = response.data.songResultData.result[0].copyrightId;
                    axios.get(download_song_url.replace("{contentId}",contentId).replace("{copyrightId}",copyrightId),{ headers })
                    .then(finalUrl=>{
                        if(finalUrl.data.code=="200002"){
                            //VIP Item
                            axios.get(download_song_url1.replace("{copyrightId}",copyrightId),{ headers : headers1 })
                            .then(finalUrl1=>{
                                if(finalUrl1.data && finalUrl1.data.code == '200' && finalUrl1.data.data
                                &&finalUrl1.data.data.playUrl){
                                    resolve("https:"+finalUrl1.data.data.playUrl)
                                }else{
                                    reject(null);
                                }
                            })
                            .catch(error => {
                                reject(error);
                            });
                        }else{
                            const med = finalUrl.request.res.responseUrl;
                            resolve(med);
                        }
                        
                    })
                    .catch(err=>{
                        reject(err);
                    })
                    
                }else{
                    reject(null);
                }
                
            })
            .catch(error => {
                reject(error);
            });
    });
    
}
