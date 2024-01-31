let http = require('http');

http.createServer((req,res) =>{
    res.send("Server is Up...");
}).listen(9000);