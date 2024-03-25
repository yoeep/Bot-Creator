const messageService = require("../kook/kookMessage");
const songSearch = require("../music/song_search");
const conn = require("../voice/voiceConnection");
const channelSercer = require("../kook/kookChannel");
const rptTransfer = require("../voice/rtpStreamTransfer");
const log = require('../../utils/logUtil')

function nextSong(){
    if(module.exports.songList.length > 0){
        const {name ,medNext}=module.exports.songList.shift();
        log.info("next--------------"+medNext);
        conn(module.exports.channelId,(rpt,conn)=>{
            log.info(rpt);
            rptTransfer(rpt,medNext,nextSong,conn);
        })
    }else{
        module.exports.channelId=null;
        log.info("end ------------");
    }
    
}

module.exports = {
    songList: [],
    currentSong: {},
    channelId:null,
    createPlayer:(userId,songName,callback)=>{
        
        channelSercer.fetchGuildlId()
        .then(guildInfo=>{
            channelSercer.fetchChannelId(userId,guildInfo.items[0].id)
            .then(channelInfo=>{
                if(channelInfo && channelInfo.items && channelInfo.items[0] && channelInfo.items[0].id){
                    module.exports.channelId = channelInfo.items[0].id;
                    conn(channelInfo.items[0].id,(rpt,conn)=>{
                        songSearch(songName)
                        .then(med => {
                            if(Object.keys(module.exports.currentSong).length == 0){
                                songList = [];
                                log.info(rpt);
                                rptTransfer(rpt,med,nextSong,conn);
                            }
                            
                        })
                        .catch(err=>{
                            if(err){
                                log.error(err);
                            }else{
                                log.error('not found!');
                            }
                            conn.close();
                        })
                        
                    })
                }else{
                    callback();
                }
                
            })
        })

    },
    addSong: (userId,songName)=>{
        log.info('add song');
        songSearch(songName)
        .then(med => {
            module.exports.songList.push({name: songName,medNext:med});
            log.info(module.exports.songList);
        })
        .catch(err=>{
            if(err){
                log.error(err);
            }else{
                log.error('not found!');
            }
        })
        
    }


}
