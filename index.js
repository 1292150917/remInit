// 暂未解决：1.外部css  2.内置rem
function rem_init(init = {
	enable: true, //是否开启自动转换功能
	size: 20 //转换大小px = rem 适配为苹果6
}) {
	init.enable === undefined ? init.enable = true : ''
	if (!init.enable) {
		console.warn('暂未开启转换rem')
		return
	} else {
		enableZd()
	}

	var HTML = document.querySelectorAll('style')
	var LINK = document.querySelectorAll('link')
	var fontSize = init.size //20rem
	// 循环执行内置的style
	HTML.forEach((item, i) => {
		var req = item.innerHTML || null
		document.querySelectorAll('style')[i].innerHTML = restReq(req)
	})
	// 内置的link获取style
	LINK.forEach((item, i) => {
		var patt1 = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
		// 判断只处理本地的数据
		if(item.href.match(patt1)[2] === location.hostname){
			loadXMLDoc(item.href)
		}
		
	})
	// 转换rem
	function enableZd() {
		// 基准大小
		const baseSize = init.size * 2;
		// 设置 rem 函数
		function setRem() {
			// 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
			const scale = document.documentElement.clientWidth / 750;
			// 设置页面根节点字体大小
			document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
		}
		// 初始化
		setRem()
		// 改变窗口大小时重新设置 rem
		window.onresize = function () {
			setRem()
		}
	}
	// 把px转换成rem的方法
	function restReq(req) {
		var test = /\d(.*?)px/g //匹配开头为数字的正则
		var c = req.match(test) //获取到前面的数量
		var s = []
		var res = req //处理后的数据
		s.push(...new Set(c))
		if (c !== null) {
			s.forEach(item => {
				var mu = parseFloat(item) + 'px'
				var zhenze = new RegExp(mu, 'g')
				res = res.replace(zhenze, (parseFloat(item) / fontSize) + 'rem')
			})
			return res
		}
	}
	// 简单封装xhr
	function loadXMLDoc(url) {
		var xmlhttp;
		var head = document.querySelector('head')
		var div = document.createElement('style')
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				div.innerHTML = restReq(xmlhttp.responseText)
				head.appendChild(div)
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send()
	}
	return
}
rem_init({
	size: 40
})