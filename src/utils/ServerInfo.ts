export default class ServerInfo {
    static readonly BASE_URL = process.env.NODE_ENV !== 'production' ?
        'http://localhost:5000' :
        // '/api';
        'http://localhost:3020';
}