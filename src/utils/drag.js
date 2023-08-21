
//可以拖动某一块区域
function drag(){
    //1、获取拖拽的元素
    var oDiv=  document.getElementById("light")
    //2、拖拽，先点击。点击时获取(鼠标距离当前窗口X轴坐标-oDiv元素对应最近元素的距离，这里是body)
    //等于获取了鼠标在拖拽元素的坐标
    oDiv.onmousedown = function(event){
        var e = event || window.event;
        var disX=e.clientX-oDiv.offsetLeft;
        var disY=e.clientY-oDiv.offsetTop;
        document.body.onmousemove=function(event){
            var e=event ||window.event
            //3、移动时，鼠标距离当前窗口x轴坐标 - 鼠标在拖拽元素的坐标 = 剩下距离body的x轴坐标
            //将这个数值设置为拖拽元素的left、top
            var boxLeft=e.clientX-disX;
            var boxTop=e.clientY-disY;
            //获取body的页面可视宽高
            var clientHeight=document.documentElement.clientHeight||document.body.clientHeight
            var clientWidth=document.documentElement.clientWidth||document.body.clientWidth
            //4、限制拖拽宽高
            if(boxLeft<0){
                boxLeft=0;
                //如果拖拽元素定位的数值高于, 页面可视宽 - 拖拽元素自身宽 (可视页面最大宽)
            }else if(boxLeft>clientWidth-oDiv.offsetWidth){
                //满足这个条件，就限制宽为，clientWidth-oDiv.offsetWidth(可视页面最大宽)
                boxLeft=clientWidth-oDiv.offsetWidth;
            }

            if(boxTop<0){
                boxTop=0;
                //如果拖拽元素定位的数值高于, 页面可视高 - 拖拽元素自身高 (可视页面最大高)
            }else if(boxTop>clientHeight-oDiv.offsetHeight){
                //满足这个条件，就限制高为，clientHeight-oDiv.offsetHeight(可视页面最大高)
                boxTop=clientHeight-oDiv.offsetHeight;
            }

            //↑将数值设置成拖拽元素的定位left、top
            oDiv.style.left = boxLeft +"px";
            oDiv.style.top = boxTop +"px";
        }
    }

    //5、鼠标抬起触发事件
    oDiv.onmouseup = function(){
        //将body的移动事件取消
        document.body.onmousemove = null;
    }
}

