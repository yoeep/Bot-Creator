const kook = require('../service/kook/kookConnection');
const messageService = require('../service/kook/kookMessage');

kook.onMessage(data=>{
    console.info("non server message");
    console.info(JSON.stringify(data));
    if(data.channel_type == "PERSON"){
        messageService.direct('reply for person ',data.author_id);
    }else if(data.channel_type == "GROUP"){
        messageService.group('reply for group ',data.target_id);
    }else{
        console.error('unknow channel type!');
    }
    
});

kook.onError(err=>{
    console.info("err found");
    console.info(JSON.stringify(err));
});

kook.connection();

/*
direct
{
    "channel_type": "PERSON",
    "type": 9,
    "target_id": "1789423720",
    "author_id": "619361786",
    "content": "？？？",
    "extra": {
        "type": 9,
        "code": "25a0cf2da70fdd8d59e8f95327b283b2",
        "author": {
            "id": "619361786",
            "username": "200多只羊",
            "identify_num": "6620",
            "online": true,
            "os": "Android",
            "status": 1,
            "avatar": "https://img.kookapp.cn/avatars/2024-03/AHtUcFVam402s02s.jpg?x-oss-process=style?x-oss-process=style/icon",
            "vip_avatar": "https://img.kookapp.cn/avatars/2024-03/AHtUcFVam402s02s.jpg?x-oss-process=style?x-oss-process=style/icon",
            "banner": "",
            "nickname": "200多只羊",
            "roles": [

            ],
            "is_vip": false,
            "vip_amp": false,
            "bot": false,
            "nameplate": [

            ],
            "decorations_id_map": null,
            "is_sys": false
        },
        "visible_only": null,
        "mention": [

        ],
        "mention_all": false,
        "mention_roles": [

        ],
        "mention_here": false,
        "nav_channels": [

        ],
        "kmarkdown": {
            "raw_content": "？？？",
            "mention_part": [

            ],
            "mention_role_part": [

            ],
            "channel_part": [

            ],
            "spl": [

            ]
        },
        "emoji": [

        ],
        "last_msg_content": "？？？",
        "send_msg_device": 2
    },
    "msg_id": "4f309976-6750-4450-8311-26339353cce8",
    "msg_timestamp": 1711101754448,
    "nonce": "1711101755878",
    "from_type": 1
}


group @bot
{
    "channel_type": "GROUP",
    "type": 9,
    "target_id": "3655610478538770",
    "author_id": "619361786",
    "content": "(met)1789423720(met)",
    "extra": {
        "type": 9,
        "code": "",
        "guild_id": "3526605417809455",
        "guild_type": 0,
        "channel_name": "文字频道",
        "author": {
            "id": "619361786",
            "username": "200多只羊",
            "identify_num": "6620",
            "online": true,
            "os": "Android",
            "status": 1,
            "avatar": "https://img.kookapp.cn/avatars/2024-03/AHtUcFVam402s02s.jpg?x-oss-process=style?x-oss-process=style/icon",
            "vip_avatar": "https://img.kookapp.cn/avatars/2024-03/AHtUcFVam402s02s.jpg?x-oss-process=style?x-oss-process=style/icon",
            "banner": "",
            "nickname": "200多只羊",
            "roles": [
                32567669
            ],
            "is_vip": false,
            "vip_amp": false,
            "bot": false,
            "nameplate": [

            ],
            "decorations_id_map": null,
            "is_sys": false
        },
        "visible_only": null,
        "mention": [
            "1789423720"
        ],
        "mention_all": false,
        "mention_roles": [

        ],
        "mention_here": false,
        "nav_channels": [

        ],
        "kmarkdown": {
            "raw_content": "@example",
            "mention_part": [
                {
                    "id": "1789423720",
                    "username": "example",
                    "full_name": "example#6551",
                    "avatar": "https://img.kookapp.cn/assets/bot.png?x-oss-process=style/icon"
                }
            ],
            "mention_role_part": [

            ],
            "channel_part": [

            ],
            "spl": [

            ]
        },
        "emoji": [

        ],
        "last_msg_content": "200多只羊：@example",
        "send_msg_device": 2
    },
    "msg_id": "26af7ebe-fc7d-41d2-add5-307fee2f3346",
    "msg_timestamp": 1711101899861,
    "nonce": "1711101901220",
    "from_type": 1
}


group 
{
    "channel_type": "GROUP",
    "type": 9,
    "target_id": "3655610478538770",
    "author_id": "619361786",
    "content": "？？？",
    "extra": {
        "type": 9,
        "code": "",
        "guild_id": "3526605417809455",
        "guild_type": 0,
        "channel_name": "文字频道",
        "author": {
            "id": "619361786",
            "username": "200多只羊",
            "identify_num": "6620",
            "online": true,
            "os": "Android",
            "status": 1,
            "avatar": "https://img.kookapp.cn/avatars/2024-03/AHtUcFVam402s02s.jpg?x-oss-process=style?x-oss-process=style/icon",
            "vip_avatar": "https://img.kookapp.cn/avatars/2024-03/AHtUcFVam402s02s.jpg?x-oss-process=style?x-oss-process=style/icon",
            "banner": "",
            "nickname": "200多只羊",
            "roles": [
                32567669
            ],
            "is_vip": false,
            "vip_amp": false,
            "bot": false,
            "nameplate": [

            ],
            "decorations_id_map": null,
            "is_sys": false
        },
        "visible_only": null,
        "mention": [

        ],
        "mention_all": false,
        "mention_roles": [

        ],
        "mention_here": false,
        "nav_channels": [

        ],
        "kmarkdown": {
            "raw_content": "？？？",
            "mention_part": [

            ],
            "mention_role_part": [

            ],
            "channel_part": [

            ],
            "spl": [

            ]
        },
        "emoji": [

        ],
        "last_msg_content": "200多只羊：？？？",
        "send_msg_device": 2
    },
    "msg_id": "1d4aef57-f981-4fa5-b947-649b2f843d8d",
    "msg_timestamp": 1711101928187,
    "nonce": "1711101929632",
    "from_type": 1
}
*/