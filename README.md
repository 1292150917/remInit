# remInit

个人闲事开发的一个初始化rem并且自动修改的小插件！

## 用法：

`remInit` 会自动把本地所有的css自动转换成rem（只会转换本地的，CDN引入的不给予处理！）

* 如果你不想该值被转换可以使用大写的Px 例如:`1Px` 将不会被处理

**注意：该代码只是引入js类型,无node支持，所以只会通过http方式读取你本地style和link，动态创建style标签，并且删除link**

**注意：该js代码建议放到script之上，link和style之下 （ 座位标签下面，的第一个js ）**

### 引入js后初始化代码--必须执行，不然不会运行

```javascript
rem_init() //初始化remInit代码
```

###可选项

```javascript
rem_init({
  enable: true,
	size: 20
})

//以上代码20px == 1rem

```
### 写入

```style
.selector {
  width: 40px;
  border: 1Px solid #ddd;
}

```
### 输出

```style
.selector {
  width: 2rem;
  border: 1px solid #ddd;
}

```

### API

```
enable : 是否开启自动转换,
size : 多少px = 1rem

```