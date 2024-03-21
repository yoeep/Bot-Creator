
const zlib = require('zlib');
const util = require('util');
const log = require('./logUtil')

module.exports = {
    unzip_res : function(message){
      console.info(message);
        const inflatezipAsync = util.promisify(zlib.inflate);
        return new Promise((resolve, reject)=>{
          inflatezipAsync(message)
          .then(data=>{
              resolve(data);
          })
          .catch(err=>{
            log.error(err);
          })
        })
        
    },
    getValueByPath: function (obj, path) {
        const keys = path.split('.');
        let current = obj;
      
        for (let key of keys) {
          if (Array.isArray(current)) {
            current = current.map(item => getValueByPath(item, keys.slice(keys.indexOf(key)).join('.')));
            console.info("====");
            console.info(current[0]);
            return current[0];
          }
      
          if (key in current) {
            current = current[key];
          } else {
            return undefined;
          }
        }
        return current;
      },
      handleAxiosResponse : function(response, path) {
        if (response.status === 200) {
            const value = module.exports.getValueByPath(response.data, path);
            if (value !== undefined) {
                return { success: true, value };
            } else {
                return { success: false, message: `Path '${path}' not found in response.` };
            }
        } else {
            return { success: false, message: `Request failed with status ${response.status}.` };
        }
    }
    
      
};