const config = {};

config.TOKEN_HEADER_KEY = 'x-hiking-token';
config.JWT_SECRET = 'TAJNI_TOKEN';
config.MONGOOSE_CONNECT_URL = 'mongodb+srv://maka:maka@cluster0.wbjd4.mongodb.net/hiking_db1?retryWrites=true&w=majority';
config.BACKEND_PORT = '3001';

module.exports = config;
