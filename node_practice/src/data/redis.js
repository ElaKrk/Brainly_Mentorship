const redis = require("redis");
const redisClient = redis.createClient({host: '192.168.99.100'});
const REDIS_KEY = "messages";


function storeMessagesInRedis(message){
    redisClient.lpush(REDIS_KEY, JSON.stringify(message));
}

function fetchValueFromRedis(){
    return new Promise((resolve, reject) => {
        redisClient.lrange(REDIS_KEY, 0, -1,
            (err, response) => {
            if (err) {
                return reject(err)
            }
            resolve((response.reverse()).map(JSON.parse))
        })
    })
}

module.exports = {
    storeMessagesInRedis,
    fetchValueFromRedis
}