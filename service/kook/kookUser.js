const requester = require('../../utils/requester')
const log = require('../../utils/logUtil')

module.exports = {
    currentUser : ()=>{
        return new Promise((resolve,reject)=>{
            requester.get("/api/v3/user/me")
            .then(data=>{
                if(data.code == 0 && data.data && data.data.id){
                    resolve(data.data.id);
                }else{
                    log.error("Init Bot Error");
                }
            })
        })
        
    }
}