const conf = require('../config/config.json')
module.exports = {

    botToken: conf.botToken,
    gpt: conf.gpt,
    gpt_with_callback: conf.gpt_with_callback,
    locahost: conf.localhost,
    kook_url: {
        basicUrl: "https://www.kookapp.cn",
        basicUrl_old: "https://www.kaiheila.cn",

    },
    logLevel: 2,//1 error, 2 error info , 3 error info debug
    // /search : "https://m.music.migu.cn/migumusic/h5/search/all?text=%E9%BE%99%E5%8D%B7%E9%A3%8E&pageNo=1&pageSize=30",

    migu: {
        search_url : 'http://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text={text}&pageNo=1&pageSize=1&searchSwitch=',
        to_add_url : '{"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}',
        download_song_url : 'http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId={copyrightId}&contentId={contentId}&resourceType=2&channel=0',
        download_song_url1: 'https://m.music.migu.cn/migumusic/h5/play/auth/getSongPlayInfo?copyrightId={copyrightId}&type=1',
        headers : {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'},
        headers1 : {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "By": "4f09e01c83d69100c363c33aecfef9f8",
            "Connection": "keep-alive",
            "Cookie": "migu_cookie_id=b89fd7e4-dfb0-4d9e-a88b-0695fbddaf74; b-user-id=81bb36b2-d487-06a1-e81d-44239870a256; mg_uem_user_id_3136357ddb6a49f5b317ca6254e7ea49=432175fd-c253-4928-b710-34943d97091f; cookieId=z--ZXoufDi7OsIDmvwCg0nfFkWTO1GG1711283612296; idmpauth=true@passport.migu.cn; migu_music_msidn=yGs7P8%2F5wd4O%2Fgp%2Fz9iO6w%3D%3D; SESSION=Y2FkYzAyYzYtOThjNS00ODFjLWFiZDQtNTZmNWNlNTczOTg2",
            "Host": "m.music.migu.cn",
            "Referer": "https://m.music.migu.cn/v4/search",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }
    },
    stringResource:{
        STR_NOTFOUND_CHANNEL: "请先加入一个语音频道",
        STR_ORDER_SUCCESS : "播放成功"
    }

    
}
