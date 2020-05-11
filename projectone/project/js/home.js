window.onload = function(){
    var login = document.getElementsByClassName('login')[0];
    var name = document.getElementById('name');
    var cipher = document.getElementById('cipher');
    var isFocus = false;
    function loginHandle() {
        var username = name.value;
        var password = cipher.value;
        if (!username) {
            zLayer({
                msg: '请输入用户名'
            });
            return;
        }
        if (!password) {
            zLayer({
                msg: '请输入密码'
            });
            return;
        }
        submit();    
    };
    bind(name, 'focus', function() {
        isFocus = true;
    });
    bind(name, 'bllur', function() {
        isFocus = false;
    });
    bind(cipher, 'focus', function() {
        isFocus = true;
    });
    bind(cipher, 'bllur', function() {
        isFocus = false;
    });

    bind(login,'click', loginHandle);
    bind(document, 'keyup', function(event) {
        if (event.keyCode === 13 || event.key === 'Enter'){
            isFocus && loginHandle();
        }
    });
};

function submit(){
    var username = document.getElementById('name').value;
    var password = document.getElementById('cipher').value;
    request({
        type: 'post',
        url: 'http://192.168.1.3:2233/login',
        data: {
            name: username,
            password: password
        },
        callback: function(res) {
            
            var obj = res;
            obj = JSON.parse(obj)
            if (obj.code === 200) {               
                zLayer({
                    msg: '登录成功',
                    color: 'success',
                    fn: function() {
                        location.href = './index.html'
                    }
                });
            }else {
                zLayer({
                    msg: obj.message || '登录失败',
                    color: 'error'
                });
            }
        }
    })
};

function request(obj){
    var xhr = new XMLHttpRequest();
    var type = obj.type;
    var url = obj.url;
    var params = obj.data;
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            obj.callback(xhr.responseText);
        }
    };
    if(type === 'get'){
        paramsD(params) && (url += '?' + paramsD(params));
    }
    xhr.open(type,url);
    if(type === 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(paramsD(params));
    } else{
        xhr.send(null);
    }
};
function paramsD(data){
    var str = '';
    for(var key in data){
        str += key + '=' + data[key] + '&';       
    }
    str.slice(0,-1);
    return str;
};

