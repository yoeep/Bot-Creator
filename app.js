const { rejects } = require("assert");
const axios = require('axios');
const fs = require('fs');
const { resolve } = require("path");
const WebSocket = require('ws');
const zlib = require('zlib');
const songSearch = require("./music/song_search");
const log = require("./utils/logUtil");
const factory = require('./utils/factory');
const requester = require('./utils/requester');
const util = require('./utils/sys_util');
const contain = require('./voice/contain');
const rptTransfer = require("./voice/rtpStreamTransfer");

const direct_message =  "/api/v3/direct-message/create";
const chanel_message = "/api/v3/message/create";
const chanel_by_msgId = "/api/v3/message/view";
const music_activity = "/api/v3/game/activity";

const selfId = factory.botID;


function replyMessage(replyUrl,targetId,content,nonce){
    const requestBody = {
        type: 1,
        target_id: targetId,
        content: content
    };
    requester.post(replyUrl,requestBody)
    .then(response=>{

        log.debug("reply response::"+JSON.stringify(response.data));
        /**
         * {
                "code": 0,
                "message": "操作成功",
                "data": {
                    "msg_id": "50974c-364c983fa6cb",
                    "msg_timestamp": 1607072537177,
                    "nonce": "xxxx"
                }
            }
         */
        if(response.data.code == 0 && response.data.message == "操作成功"){
            log.debug("回复成功"+response.data.data.msg_id);
        }else{
            log.error("回复失败");
        }
    })
    .catch(error=>{
        log.error("回复失败"+error);
    });
}


requester.get("/api/v3/gateway/index")
.then(response => {
  if(response.data.url){
    log.debug(response.data.url);
    const conn = new WebSocket(response.data.url);
    
    conn.on("open",()=>{
        console.debug('connect success!');
        conn.on("message",data=>{
            log.debug(data);
            util.unzip_res(data)
            .then(data => {
                //log.debug(res);
                const dataString = data.toString('utf-8');
                const jsonData = JSON.parse(dataString);
                log.debug(jsonData);
                if(jsonData.s == 0 && jsonData.d.author_id != selfId){
                    //reply
                    let replyUrl = "";
                    const content = "success ...!!";
                    if(jsonData.d.channel_type == "GROUP"){
                        //from channel
                        const channelName = jsonData.d.extra.channel_name;
                        replyUrl = chanel_message;
                        replyMessage(replyUrl,jsonData.d.target_id,content,jsonData.d.nonce);
                        
                    }else if(jsonData.d.channel_type == "PERSON"){
                        log.info(jsonData.d.content);
                        if(jsonData.d.content){
                            songSearch(jsonData.d.content)
                            .then(songInfo => {
                                const {id,name,singerName,media} = songInfo;
                                //log.debug(media);
                                contain("4945474781098459",rptURL=>{
                                    console.info(rptURL);
                                    rptTransfer(rptURL,media,null)
                                })
                                
                            });
                        }
                        
                        //from person
                        replyUrl =  direct_message;
                        replyMessage(replyUrl,jsonData.d.author_id,content,jsonData.d.nonce);

                    }else{
                        log.error("unknown channel:"+jsonData.d.channel_type);
                    }
                    log.debug(replyUrl);
                }
            });
          
        });
        conn.on("error", err=>{
            log.error("error socket:"+err);
        });
    })
  }
  
})




