const kook = require('./service/kook/kookConnection');
const messageService = require('./service/kook/kookMessage');
const musicHandle = require('./service/bot/musicHandle');


const qa = require('./service/language_support/qa');
kook.onDirectMessage(data=>{
    qa(data.author_id,data.content,(a)=>{messageService.direct(a,data.author_id)}, true);
    
})
kook.onGroupMessage(data=>{
    // console.info("non server group message");
    // messageService.group('reply for group non server group message',data.target_id);
})
kook.onGroupMetMessage(data=>{

    const regex = /\(met\)(.*)\(met\)\s*(.*)/;
    const match = regex.exec(data.content);
    
    if (match && match.length >= 3) {
        const content = match[2];
        console.info(match[1]);
        qa(data.author_id,content.trim(),(a)=>{messageService.group(a,data.target_id)});
        // if(musicHandle.channelId){
        //     musicHandle.addSong(data.author_id, content.trim())
        // }else{
        //     musicHandle.createPlayer(data.author_id, content.trim(),()=>{messageService.group('Please join channel first.',data.target_id)});
        // }
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
//kook api

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
