const requester = require('../../utils/requester');
const log = require('../../utils/logUtil');

module.exports = {
    fetchChannelId: (userId,guild_id)=>{
        return new Promise((resolve,reject)=>{
            requester.get(`/api/v3/channel-user/get-joined-channel?guild_id=${guild_id}&user_id=${userId}`)
            .then(data=>{
                if(data && data.code == 0){
                    resolve(data.data);
                }else{
                    log.error(data);
                    resolve(null);
                }
                
            })
        });
    },
    fetchGuildlId: ()=>{
        return new Promise((resolve,reject)=>{
            requester.get(`/api/v3/guild/list`)
            .then(data=>{
                if(data && data.code == 0){
                    resolve(data.data);
                }else{
                    log.error(data);
                    resolve(null);
                }
            })
        });
    }
}