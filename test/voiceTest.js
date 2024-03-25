const sourceUrl = "";
const contain = require("../service/voice/voiceConnection");
const rptTransfer = require("../service/voice/rtpStreamTransfer");
const channelSercer = require("../service/kook/kookChannel");
const songSearch = require("../service/music/song_search")
const userId = 619361786;
channelSercer.fetchGuildlId()
.then(guildInfo=>{
    channelSercer.fetchChannelId(userId,guildInfo.items[0].id)
    .then(channelInfo=>{
        console.info(channelInfo.items[0].id);
        contain(channelInfo.items[0].id,rptURL=>{
            console.info(rptURL);
            songSearch("风之诗")
            .then(med => {
                rptTransfer(rptURL,med,null)
            })
            .catch(err=>{
                if(err){
                    console.err(err);
                }else{
                    console.error('not found!');
                }
            })
            
        })
    })
})


    
