
var type = 'recommend';  // 请求图片类型  
var url = 'http://192.168.0.104:2233/album'; // 接口公共部分  
var names = ['recommend', 'hot', 'new'];  // 对应的三种图片查询类型，同时对应三个元素的class  

names.forEach(function(item) {
    var el = byClass(item)[0];
    el.addEventListener('click', event);
});

function event(event) {
    // 给三种类型元素绑定的点击事件
    var el = event.target;
    var name = el.classList, link;
    if (name.contains('active')) {
        return ;
    }else {
        var els = document.getElementsByTagName('li');
        for(var i = 0;i < els.length;i++){
            var ele = els[i];
            var n = ele.classList;
            n.remove('active');
        }
    
        name.add('active'); // 给当前点击的元素添加选中样式
        // todo  清除其他元素被选中的状态
        // console.log(name.item(0));       
        link = url + '?type=' + name.item(0);
        getList(link) ;
    }
    // render();
};

function byClass(name){
    // 通过元素class获取元素
    return document.getElementsByClassName(name);
}

function getList(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 &&  xhr.status === 200) {
            var list = JSON.parse(xhr.response);
            f(list.data.items)
        }
    };
    xhr.send(null);
};

var f = function(items){
    var container = byClass('container-box')[0];
    // 遍历每一条数据，每一条数据创建一个元素，全部添加到一个ul里面，最后再把这个ul全都添加到container-box里面
    var ul = ce('ul'), li;
    items.forEach(function(value,index,items){
        // console.log(items[index]);
        li = ce('li');
        li.innerHTML = '<div class="img-photo">' +
        '<img src="'+ value.item.pictures[0].img_src +'" /> <span class="title">' + value.item.title + '</span><span class="name">' + value.user.name + '</span><img class="head" src="' + value.user.head_url + '" />' +
        '</div>'
        // li.innerText = value.user.name;
        ul.appendChild(li);
    });
    // 每次重新渲染之前，先把元素清空
    container.innerHTML = '';
    container.appendChild(ul);
} ;
// function render(){
//     var lis = document.getElementsByTagName('li');
//     for(var i = 0;i < 2;i++){
//         lis[i].appendChild(box);
//     }
// };
function ce(label){
    return document.createElement(label);
};

