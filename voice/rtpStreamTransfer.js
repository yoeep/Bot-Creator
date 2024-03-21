
const { exec } = require('child_process');

module.exports = (url , sourceUrl, callback)=>{
    const rtpURL = url;
    const commend = `ffmpeg -re -loglevel level+info -nostats -i "${sourceUrl}" -map 0:a:0 -acodec libopus -ab 128k -filter:a volume=0.8 -ac 2 -ar 48000 -f tee [select=a:f=rtp:ssrc=1357:payload_type=100]${rtpURL}`;
    console.info(commend);
    exec(commend, (error, stdout, stderr) => {
      if (error) {
        console.error(`error1£º ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`error£º ${stderr}`);
        return;
      }
      console.log(`output£º ${stdout}`);
    });
    
}