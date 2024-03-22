
const WebSocket = require('ws');

const log = require("../../utils/logUtil");
const factory = require('../../utils/factory');
const requester = require('../../utils/requester');
const util = require('../../utils/sys_util');
const userService = require('./kookUser');

const EventEmitter = require('events');

let connect;
let isStart = true;


const myEmitter = new EventEmitter();

const pingReq = {
    "s": 2,
    "sn": 0
}

function fetchGateway(){
    return new Promise((resolve,reject)=>{
        requester.get("/api/v3/gateway/index")
        .then(response => {
            if(response&&response.data&&response.data.url){
                log.info(response.data.url);
                connectSocket(response.data.url)
            }else{
                log.error(response.data);
                log.error("fetch gateway fail!");
            }
        })
    })
}

function connectSocket(url){
    const conn = new WebSocket(url);
    conn.on("open",()=>{
        log.info('connect success!');
        connect = conn;
        //inti connection
        userService.currentUser()
        .then((id)=>{
            //1. set bot id
            log.debug('set bot id==='+id);
            const selfId = id;
            //2. run ping pong task
            executeTask();
            // 3. message handle
            conn.on("message",data=>{
                util.unzip_res(data)
                .then(res =>{
                    const jsonData = JSON.parse(res.toString('utf-8'));
                    //3.1. update max sn
                    if(jsonData && jsonData.sn){
                        pingReq.sn = Math.max(jsonData.sn, pingReq.sn);
                    }
                    //3.3 useful message event 
                    if(jsonData.s == 0 && jsonData.d.author_id != selfId){
                        //3.2 group/group mention/direct event
                        if(jsonData.d.channel_type == "PERSON"){
                            extraEvent("direct",jsonData.d);
                        }else if(jsonData.d.channel_type == "GROUP"){
                            if(jsonData.d.extra && jsonData.d.extra.mention && jsonData.d.extra.mention.includes(""+selfId)){
                                extraEvent("groupMet",jsonData.d);
                            }else{
                                extraEvent("group",jsonData.d);
                            }
                            
                        }else{
                            console.error('unknow channel type!');
                        }
                        //only return message data
                        myEmitter.emit("message",jsonData.d);
                    }else{
                        log.debug(jsonData);
                    }
                    
                })
                
            });
            //4 error handle event
            conn.on("error", err=>{
                myEmitter.emit("error",err)
            });
        })
        
        
    })
}

function extraEvent(eventName, para){
    if(myEmitter.listenerCount(eventName)>0){
        myEmitter.emit(eventName,para);
    }
}
  
function executeTask() {
    ping();
    const delay = Math.random() * 10 * 1000 + 25 * 1000;
    setTimeout(executeTask, delay);
}

function ping(){
    log.info(pingReq);
    connect.send(JSON.stringify(pingReq));

}

function reconnection(){

}

module.exports = {
    connection : ()=>{
        fetchGateway();
    },
    onMessage : (callback)=>{
        myEmitter.on("message",data=>{
            callback(data);
        });
    },
    onGroupMessage : (callback)=>{
        myEmitter.on("group",data=>{
            callback(data);
        });
    },
    onGroupMetMessage : (callback)=>{
        myEmitter.on("groupMet",data=>{
            callback(data);
        });
    },
    onDirectMessage : (callback)=>{
        myEmitter.on("direct",data=>{
            callback(data);
        });
    },
    onError : (callback)=>{
        myEmitter.on("error",data=>{
            callback(data);
        });
    }

}

