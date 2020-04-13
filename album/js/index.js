var type = 'recommend';  // 请求图片类型  
var url = 'http://192.168.1.3:2233/album'; // 接口公共部分  
var names = ['recommend', 'hot', 'new'];  // 对应的三种图片查询类型，同时对应三个元素的class  

names.forEach(function(item) {
    var el = byClass(item)[0]
    el.addEventListener('click', event);
})

function event(event) {
    // 给三种类型元素绑定的点击事件
    var el = event.target;
    var name = el.classList, link;
    if (name.contains('active')) {
        return 
    }else {
        name.add('active'); // 给当前点击的元素添加选中样式
        // todo  清除其他元素被选中的状态
        console.log(name.item(0))
        link = url + '?type=' + name.item(0)
        getList(url) 
    }
}

function byClass(name) {
    // 通过元素class获取元素
    return document.getElementsByClassName(name)
}

function getList(url) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 &&  xhr.status === 200) {
            console.log(xhr.response)
        }
    }
    xhr.send(null);
}