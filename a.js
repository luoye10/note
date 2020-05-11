// console.log(134);
const fs = require('fs')
const http = require('http')
http.createServer(function(request,response){
    fs.readFile('./a.html', (err, text) => {
        if(err) {
            return err;
        }
        response.end(text)
    })
}).listen(2233);