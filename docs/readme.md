# 大直播（qlive）
> 该项目仅做html+css开发，且作demo展示及版本管理。目录如下：

# Catalog
- [Install](#install)
- [Run](#run)
- [Coding Style](#codingstyle)
    - [命名规范](#命名规范)
        - [目录及文件命名](#目录及文件命名)
        - [图片命名](#图片命名)
        - [ClassName命名](#classname命名)
    - [html规范](#html规范)
        - [html代码](#html代码)
        - [html注释](#html注释)
    - [css规范](#css规范)
        - [css代码](#css代码)
        - [css注释](#css注释)
    - [图片规范](#图片规范)
        - [图片格式](#图片格式)
        - [图片大小](#图片大小)
        - [图片质量](#图片质量)
        - [图片引入](#图片引入)
- [Version Management](#versionmanagement)
    - [Git初始化设置注意点](#git初始化设置注意点)
    - [Git开发阶段注意事项](#git开发阶段注意事项)


----



# Install 
Install with npm:
```bash
npm install 

cnpm install  // 因网络环境问题 推荐使用

```
# Run
Run with gulp:
```bash
gulp   
// 默认本地启动静态服务，访问demo；
// localhost:8888 进行访问。

gulp test    
// 打包为测试环境静态资源；
// 输出目录为test

gulp public
// 打包为灰度和线上环境静态资源；
// 输出目录为public

```

# CodingStyle
## 命名规范
### 目录及文件命名 
确保目录或文件命名总是以字母开头而不是数字，且字母一律小写，以下划线连接且不带其他标点符号(模块文件要以下划线开头)，如：
```html
<!-- HTML -->
qlive.html
qlive_list.html
qlive_detail.html
_qlive_mod.html
<!-- css -->
qlive.css
qlive_list.css
qlive_detail.css
_qlive_mod.css
```
### 图片命名 
图片命名建议以以下顺序命名：  
**图片业务（可选） + 图片功能类别（可选）+ 图片私有名称（必选） + 图片精度（可选）**  
- 图片业务：
    - xiu_ : 秀场
    - qlive_: 大直播
- 图片功能类别：
    - mod_：是否公共，可选
    - icon：模块类固化的图标
    - logo：LOGO类
    - spr：单页面各种元素合并集合
    - btn：按钮
    - bg：可平铺或者大背景
- 图片私有名称：
    - goodslist：商品列表
    - goodsinfo：商品信息
    - userava tar：用户头像
- 图片精度：
    - 普清：@1x
    - Retina：@2x | @3x  
  
如下面例子：  
```
bg_boardlist.png
xiu_btn_goodlist@2x.png
qlive_btn_goodlist.png
btn_goodlist.png 
```  

### ClassName命名  
ClassName的命名应该尽量精短、明确，**面向属性命名** 必须以 **字母开头命名**，且**全部字母为小写**，单词之间**统一使用中划线 “-” 连接**。  

而且还要遵循三无原则：
- 无ID 
- 无标签
- 减少层级嵌套    

以上原则的目的就是为了：  
1. *增加重用性*（在预处理语言中更能体现这个优势@extend）
2. *减小css文件大小。*（CSS名称不要像老太太的裹脚布一样，搞得又臭又长）
3. *增强渲染效率*（CSS渲染元素和使用JavaScript获取页面元素那是完全不一样的，从样式表中看“从右向左”进行匹配）

保守例子如下：
```html
<div class="mod-name">
    <div class="mod-name-cover"></div>
    <div class="mod-name-info">
        <div class="mod-name-info-user">
            <div class="mod-name-info-user-img">
                <img src="" alt="">
                <!-- 这个时候 miui 为 mod-name-info-user-img 首字母缩写-->
                <div class="miui-tit"></div>
                <div class="miui-txt"></div>
                ...
            </div>
        </div>
        <div class="mod-name-info-list"></div>
    </div>
</div>
```
但是如果还可以再简单粗暴一些  
```css
.mn-co{*****}
.mn-co-inf{******}
.mn-txt{****}
```
如果当心命名冲突，你还可以给指定模块指定页面增加指定前缀。有如此多的排列组合，我就不信了，一个页面中会有冲突。

## html规范
### html代码
- HTML文件必须加上 DOCTYPE 声明，并统一使用 HTML5 的文档声明 ` <!DOCTYPE html> `。
- 页面语言考虑浏览器和操作系统的兼容性，目前仍然使用` <html lang="zh-CN"> `属性值。
- 页面编码统一使用` <meta charset="UTF-8"> ` 。
- HTML标签名、类名、标签属性和大部分属性值统一用小写。
- 元素属性值使用双引号语法。
- 统一使用 `4个空格` 进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）。
- 特殊符号采用转义符书写。

例子如下：  
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>HTML5标准模版</title>
</head>
<body>
    <input type="text">
    <div class="demo">wo shi demo &nbsp; &bull; </div>
</body>
</html>
```

### html注释
单行注释
```html
<!-- Comment Text -->
<div>...</div>
```

模块注释
```html
<!-- S Comment Text A -->	
<div class="mod-a">
    ...
</div>
<!-- E Comment Text A -->
	
<!-- S Comment Text B -->	
<div class="mod-b">
    ...
</div>
<!-- E Comment Text B -->
```

## css规范
### css代码
- 样式文件必须写上编码规则，并且一定要在样式文件的第一行首个字符位置开始写` @charset "UTF-8"; `
- 样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。
- 统一使用`4个空格`进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）。
- 属性值为`0`，后边不要跟随单位。
- 代码格式化，推荐使用展开模式书写（expanded）  

例子如下：
```css
.demo{
    display: block;
    width: 50px;
}
```  
- **建议遵循以下顺序：**  

例子如下：
```css
/**
* 布局定位属性：display / position / float / clear / visibility / overflow
* 自身属性：width / height / margin / padding / border / background
* 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
* 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …
*/
.demo {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```  
- CSS3 浏览器私有前缀在前，标准前缀在后  

例子如下：
```css
.demo {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

### css注释
样式表中推荐的注释如下：  
```css
@charset "UTF-8";
/**
 * @desc File Info
 * @author Tim
 * @date 2025-10-10
 */
/* Module A
----------------------------------------------------------------*/
.mod-a {}
/* module A logo */
.mod-a-logo {}
/* module A nav */
.mod-a-nav {}
/* Module B
----------------------------------------------------------------*/
.mod-b {}
/* module B logo */
.mod-b-logo {}
/* module B nav */
.mod-b-nav {}
```

## 图片规范
### 图片格式
#### 内容图
> 内容图多以商品图，主播头像等照片类图片形式存在，一般后端会返回相应图片url。

#### 背景图
> 背景图多为图标等颜色比较简单、文件体积不大、起修饰作用的图片。  

- PNG 与 GIF 格式，优先考虑使用 PNG 格式，PNG格式允许更多的颜色并提供更好的压缩率。
- 图像颜色比较简单的，如纯色块线条图标，优先考虑使用 PNG8 格式，避免不使用 JPEG 格式。
- 图像颜色丰富而且图片文件不太大的（40KB 以下）或有半透明效果的优先考虑 PNG24 格式。
- 图像颜色丰富而且文件比较大的（40KB - 200KB）优先考虑 JPEG 格式。
- 条件允许的，优先考虑 WebP 代替 PNG 和 JPEG 格式。

###  图片大小
> 中国普通家庭的宽带基本能达到8Mbps，实际速率大约为500—900KB/s，全国3G/4G用户占有比超过了50%，为了保证图片能更好地加载展示给用户看， 约定如下：

- **PC平台单张的图片的大小不应大于 400KB**。
- **移动平台单张的图片的大小不应大于 200KB**。

### 图片质量
- 上线的图片都应该经过压缩处理，压缩后的图片不应该出现肉眼可感知的失真区域。
- 60质量的JPEG格式图片与质量大于60的相比，肉眼已看不出明显的区别，因此保存 JPEG 图的时候，质量一般控制在60，若保真度要求高的图片可适量提高到 80，图片大小控制在 400KB 以内。

### 图片引入
- 测试内容图应该写上表明图片尺寸的占位图，可以用线上占位图生成服务，而且不用添加请求协议头如：

例子如下：
 ```html
 <img src="//dummyimage.com/160x90/23d31e/fff" alt="占位图" >
 ```
- 样式表中背景图片引入如下：

例子如下：
```css
/** 变量imgPath已经在配置文件中全局声明好了，请引用相应模块，自行补全后面相对路径即可*/
 .demo{
     background-image: url("@{imgPath}/demo/demo.png");
 }
 ```
  

# VersionManagement  
> 本项目采用Git做为版本控制工具

## Git初始化设置注意点
> 在各操作系统下，文本文件所使用的换行符是不一样的。因此推荐只将 UNIX 风格的换行符保存入库。但它也考虑到跨平台协作的场景，并且提供了一个“换行符自动转换”功能。
这个功能默认处于“自动模式”，当你在签出文件时，它试图将 UNIX 换行符（LF）替换为 Windows 的换行符（CRLF）；当你在提交文件时，它又试图将 CRLF 替换为 LF。

设置代码代码如下：
```
git config --global core.autocrlf false  //提交检出均不转换
git config --global core.safecrlf true  // 拒绝提交包含混合换行符的文件
```


## Git开发阶段注意事项
- 要从中心仓库中fork出个人仓库，一切需求都从个人仓库中拉出feature分支进行开发。
- 开发完成后，优先 `pull／fetch` 中心仓库，在本地解决冲突，使个人仓库于此保持同步。
- 测试通过上线时，将个人仓库中的feature分支合入master分支（采用`git merge --squash`方式），保持提交整洁。
- git commit 备注名称格式：**@[pms名称]-[单号]-[需求名称]**。  

例如：
```
git commit -m "@GAMELIVE-123-侧边栏布局调整"
```

- 最后将个人仓库中master新提交以`merge request`形式通信同步给中央仓库。（记得在submit前assignee中心仓库管理员，该管理员会收到你的MR邮件通知）  








----

