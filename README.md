# 图片幻灯片式轮播展示组件

## 组件说明

一款源生javaScript编写的左右滑动式切换、用于图片轮播展示的组件。
[效果展示](http://www.zjresume.com/project/slideImg/demo.html)

## 浏览器支持

* 支持IE6+、Firefox、Opera 、Safari 、Chrome浏览器。

## 使用方法

### 使用步骤

1.引入`slideImg.css`和`slideImg.js`文件。   

2.实例化一个新的carouselImg组件对象。
  ```javascript
  var newObj = new slideImg();
  ```
3.设置组件相关参数。
  ```javascript
  newObj.data = {
    //图片链接
    picSrc:['img/lb1.jpg','img/lb2.jpg','img/lb3.jpg','img/lb4.jpg','img/lb5.jpg'],
    //主图宽度
    picWidth:590,
    //主图高度
    picHeight:400,
  };
  ```
4.组件初始化。
  ```javascript
  //init()方法需要传入的参数为存放组件的容器的id，字符串格式。
  newObj.init('slideImg_test');
  ```
5.组件开始运行。
  ```javascript
  //组件开始运行
  newObj.action();
  ```

### 实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>slideImgTest</title>
  <link rel="stylesheet" href="slideImg.css">
</head>
<body>
    <div id="slideImg_test"></div>
</body>
</html>
<script src="slideImg.js"></script>
<script>
  //创建组件对象
  var newObj = new slideImg();
  //设置组件参数
  newObj.data = {
    picSrc:['img/lb1.jpg','img/lb2.jpg','img/lb3.jpg','img/lb4.jpg','img/lb5.jpg'],//Array,必须设置
    picHref:['http://www.baidu.com','#','javascript:;','#','#'],//Array,默认'javascript:;'
    picWidth:590,//Number,必须设置，单位px
    picHeight:400,//Number,必须设置，单位px
    playSpeed:1500 //Number,默认2000，单位ms
  };
  //组件初始化
  newObj.init('slideImg_test');
  //组件开始运行
  newObj.action();
</script>
```

### 相关说明

* __newObj.data__相关参数   
   newObj.data对象__必须设置值__的属性有__picSrc__、__picWidth__、__picHeight__三项。   
   newObj.data对象__可以选择设置值__的属性有__picHref__、__playSpeed__两项。   
   __各属性值的数据类型请参见实例的标注说明。__

* __newObj.init()__方法   
   newObj.init()需要传入参数(字符串格式传入),即传入存放组件的容器的id值，__html中需要事先存在相应的标签__。

* __newObj.action()__方法   
   newObj.action()需要在前面的设置都完成后在执行，需要放置在最后，顺序不可颠倒。




