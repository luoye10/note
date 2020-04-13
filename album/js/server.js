const https = require('https');
const http = require('http');
http.createServer(function(request, response) {
    let url = request.url, type;
    if (/^\/album/.test(url)) {
        type = getType(url) || 'recommend';
        startGetAlbum(response, type);
    }
}).listen(2233);
function getType(url) {
    var params = url.split('?')[1]
    params = params[0].split('&')
    for(var i = 0; i < params.length; i++) {
        if (params[i].indexOf('type')) {
            return params[i].split('=')[1];
        }
    }
    return ''
}
function startGetAlbum(response, type) {
    https.get('https://api.vc.bilibili.com/link_draw/v2/Doc/index?type=' + type +'&page_num=0&page_size=45', res => {
        // response.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            response.setHeader('Access-Control-Allow-Origin', '*');
            try {
                response.end(rawData)
            } catch (e) {
                console.error(e.message);
            }
        })
    })
}
