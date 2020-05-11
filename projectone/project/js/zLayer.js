(function(global, factory){
    global.zLayer = factory();   
})(this, function() {
    var colorlist = {
        success: 'green',
        error: 'red',
        init: 'gray'
    };
    /**
     *  创建元素
     * @params tag String 要创建的标签名称
    */
    function createElement(tag) {
        if (!tag) {
            throw Error('the first params is must be need!')
        }
        if (typeof tag !== 'string') {
            throw Error('the params tag is must be string')
        }
        return document.createElement(tag)
    }

    /**
     * 弹窗显示相关信息
     * @params obj Object
     * obj.msg  提示的文字信息（必需）
     * obj.color 弹窗的背景颜色
     * obj.time 弹窗显示的时间(毫秒)
     * obj.fn 弹窗消失时要执行的操作
     * 
    */
    function layers(obj) {
        var el = createElement('div');
        el.style = 'position: absolute; left: 50%; top: 50%; transform: translateX(-50%); background: gray;opacity: 0; transition: all .5s;padding: 10px 15px; border-radius: 5px;color: #fff;'
        el.className = 'zlayer'
        el.innerText = obj.msg || ''
        layerShow(el, obj.color || 'init');
        layerHide(el, obj.time, obj.fn);
    }

    function layerShow(el, color) {
        document.body.appendChild(el);
        el.style.background = colorlist[color]; 
        setTimeout(function() {
            el.style.marginTop = '-10px';
            el.style.opacity = 1;
        }, 50)
    }

    function layerHide(el, time, fn) {
        time = time || 3000;
        setTimeout(function() {
            el.style.marginTop = '0px';
            el.style.opacity = 0;
            setTimeout(function() {
                document.body.removeChild(el);
            }, 500)
            fn && fn();
        }, time)
    }
    return layers;
})