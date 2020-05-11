window.onload = function(){
    var system = document.getElementsByClassName('system')[0];
    bind(system,'click',function(){
        var setting = document.getElementsByClassName('setting')[0];
        if(setting.style.display === 'block'){
            setting.style.display = 'none';
        }else{
            setting.style.display = 'block';
        } 
    });
    var manage = document.getElementsByClassName('manage')[0];
    bind(manage,'click',function(){
        var covers = document.getElementsByClassName('covers')[0];
        if(covers.style.display === 'block'){
            covers.style.display = 'none';
            manage.style.backgroundColor = '';
        }else{
            covers.style.display = 'block';
            manage.style.backgroundColor = '#1890ff';
        }
    });    
};

