const requester = require('../../utils/requester')
const log = require('../../utils/logUtil')
function sendMessage(url,msg, targetId){
    const requestBody = {
        type: 1,
        target_id: targetId,
        content: msg
    }
    requester.post(url,requestBody)
    .then(data=>{
        log.debug(data);
        if(data.code == 0){
            log.info(`create message success ${targetId}:${data.data.msg_id}`);
        }else{
            log.error("Send message error");
            log.error(data);
        }
    })

}
module.exports = {
    direct: (msg, targetId)=>{
        sendMessage( "/api/v3/direct-message/create",msg, targetId);
    },
    group: (msg, targetId)=>{
        sendMessage( "/api/v3/message/create",msg, targetId);
    },
    
}