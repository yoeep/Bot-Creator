const kook = require('./service/kook/kookConnection');
const messageService = require('./service/kook/kookMessage');

kook.onDirectMessage(data=>{
    console.info("non server direct message");
})
kook.onGroupMessage(data=>{
    console.info("non server group message");
})
kook.onGroupMetMessage(data=>{
    console.info("non server group met message");
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