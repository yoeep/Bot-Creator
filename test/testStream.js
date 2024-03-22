const sourceUrl = "https://freetyst.nf.migu.cn/public/product9th/product46/2023/05/1120/2009�?06�?26日博尔普�?/歌曲下载/MP3_40_16_Stero/60054701896201905.mp3";
const contain = require("../service/voice/contain");
const rptTransfer = require("../service/voice/rtpStreamTransfer");
contain("4945474781098459",rptURL=>{
    console.info(rptURL);
    rptTransfer(rptURL,sourceUrl,null)
})
    
