module.exports = class DatabaseConecctionData {
    user
    password
    host
    name
    port
    
    constructor(user, password, host, name, port){
        this.user = user;
        this.password = password;
        this.host = host;
        this.name = name;
        this.port = port;
    }
}