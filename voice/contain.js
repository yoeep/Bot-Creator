const WebSocket = require("ws");
const axios = require("axios") ;
const log = require("../utils/logUtil");
const fs = require("fs");

const upath = require('upath');
const crypto = require('crypto');
const requester = require('../utils/requester');



const msgJSON = JSON.parse(fs.readFileSync(upath.toUnix(upath.join(__dirname, "./msg.json")), { encoding: "utf-8", flag: "r" }));


//callback = function (rtpURL)
module.exports = function (channel_id,callback){

    requester.oldVersion.get(`/api/v3/gateway/voice?channel_id=${channel_id}`)
    .then(response => {
        
        log.debug(response.data);
        if(response.data.gateway_url){
            log.debug(response.data.gateway_url);
            const conn = new WebSocket(response.data.gateway_url);
            
            conn.on("open",()=>{
                log.info('connect success!');
                conn.send(JSON.stringify(msgJSON[1]));
                        var current = 1;
                        setInterval(() => {
                            conn.ping("");
                        }, 30 * 1000)
                        conn.on('message', (message) => {
                            log.debug(message.toString("utf8"))
                            if (message.toString("utf8")) {
                                log.debug(message);
                                const data = JSON.parse(message.toString("utf8"));
                                log.debug(`${current}: `);
                                console.dir(data, { depth: null });
                                log.debug("");
                                if (current == 1) {
                                    msgJSON[2].id = crypto.randomInt(1000000, 10000000);
                                    // msgJSON[2].data.displayName = "PlayTest#1";
                                    conn.send(JSON.stringify(msgJSON[2]));
                                    current = 2;
                                } else if (current == 2) {
                                    msgJSON[3].id = crypto.randomInt(1000000, 10000000);
                                    conn.send(JSON.stringify(msgJSON[3]));
                                    current = 3;
                                } else if (current == 3) {
                                    const transportId = data.data.id;
                                    ip = data.data.ip;
                                    port = data.data.port;
                                    rtcpPort = data.data.rtcpPort;
                                    msgJSON[4].id = crypto.randomInt(1000000, 10000000);
                                    msgJSON[4].data.transportId = transportId;
                                    conn.send(JSON.stringify(msgJSON[4]));
                                    current = 4;
                                } else if (current == 4) {
                                    log.info(`rtp://${ip}:${port}?rtcpport=${rtcpPort}`);
                                    current = 5;
                                    callback(`rtp://${ip}:${port}?rtcpport=${rtcpPort}`);
                                }
                                else {
                                    if (data.notification && data.method && data.method == "disconnect") {
                                        log.info("disconnect");
                                    }
                                }
                            }
                        });
                    
                conn.on("error", err=>{
                    log.error("error socket:"+err);
                });

            
            })
        }
    });

}
