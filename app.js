const kook = require('./service/kook/kookConnection');
const messageService = require('./service/kook/kookMessage');
const musicHandle = require('./service/bot/musicHandle');

kook.onDirectMessage(data=>{
    
    if(musicHandle.channelId){
        musicHandle.addSong(data.author_id, data.content)
    }else{
        musicHandle.createPlayer(data.author_id, data.content,()=>{messageService.direct('Please join channel first.',data.author_id)});
    }
    

})
kook.onGroupMessage(data=>{
    console.info("non server group message");
    messageService.group('reply for group non server group message',data.target_id);
})
kook.onGroupMetMessage(data=>{

    const regex = /\(met\)(.*?)\(met\)/; 
    const match = regex.exec(data.content);

    if (match) {
        const desiredString = match[1];
        if(musicHandle.channelId){
            musicHandle.addSong(data.author_id, desiredString.trim())
        }else{
            musicHandle.createPlayer(data.author_id, desiredString.trim(),()=>{messageService.group('Please join channel first.',data.target_id)});
        }
    }
    
    // musicHandle.createPlayer()
})
kook.onMessage(data=>{
    console.info("non server message");
    console.info(JSON.stringify(data));
    
});

kook.onError(err=>{
    console.info("err found");
    console.info(JSON.stringify(err));
});

kook.connection();