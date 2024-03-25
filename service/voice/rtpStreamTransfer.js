
const { exec } = require('child_process');
const log = require('../../utils/logUtil')

module.exports.currentStreaming = null;

module.exports = (url , sourceUrl, callback, conn)=>{
    const rtpURL = url;
    const commend = `ffmpeg -re -loglevel level+info -nostats -i "${sourceUrl}" -map 0:a:0 -acodec libopus -ab 128k -filter:a volume=0.8 -ac 2 -ar 48000 -f tee [select=a:f=rtp:ssrc=1357:payload_type=100]${rtpURL}`;
    log.info(commend);
    const childProces = exec(commend, (error, stdout, stderr) => {
      if (error) {
        log.error(`error: ${error}`);
        return;
      }
    });
    module.exports.currentStreaming= childProces;
    childProces.stderr.on('data', (data) => {
      const process = data.toString().trim();
    });
    childProces.on('exit', (code) => {
      log.info(`exit code:${code}`);
      conn.close();
      module.exports.stopStreaming(null);
      callback();
    });
    
}

module.exports.stopStreaming = (callback) => {
  module.exports.currentStreaming.kill("SIGINT");
}