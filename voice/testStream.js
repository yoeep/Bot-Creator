const sourceUrl = "https://freetyst.nf.migu.cn/public/product9th/product46/2023/05/1120/2009年06月26日博尔普斯/歌曲下载/MP3_40_16_Stero/60054701896201905.mp3";
const contain = require("./contain");
const rptTransfer = require("./rtpStreamTransfer");
contain("4945474781098459",rptURL=>{
    console.info(rptURL);
    rptTransfer(rptURL,sourceUrl,null)
})
    
