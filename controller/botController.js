const musicHandle = require('../service/bot/musicHandle')
const factory = require('../utils/factory')
const botConntroller = {
    orderSong : (req, res)=>{
        musicHandle.createPlayer(req.body.user_id, req.body.sing_name, (result)=>{
            if(result == "FAIL"){
                res.send(factory.stringResource.STR_NOTFOUND_CHANNEL);
            }else if(result == "SUCC"){
                res.send(factory.stringResource.STR_ORDER_SUCCESS);
            }
            
        });
    }
}

module.exports = botConntroller;



