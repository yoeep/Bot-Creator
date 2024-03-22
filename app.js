const kook = require('./service/kook/kookConnection');
const messageService = require('./service/kook/kookMessage');

kook.onDirectMessage(data=>{
    console.info("non server direct message");
    messageService.direct('reply for person non server direct message',data.author_id);
})
kook.onGroupMessage(data=>{
    console.info("non server group message");
    messageService.group('reply for group non server group message',data.target_id);
})
kook.onGroupMetMessage(data=>{
    console.info("non server group met message");
    messageService.group('reply for group non server group met message',data.target_id);
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