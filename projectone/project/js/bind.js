function bind( obj, eventStr , callback){
    if(obj.addEventListener){
        obj.addEventListener(eventStr,callback,false);   
    }else{
        obj.attachEvent('on'+eventStr,function(){
            callback.call(obj);
        });   
    }
};