
	// 暂未解决：1.外部css  2.内置rem
		function rem_init(init = { enable: true, size: 20 }) {
			if (!init.enable) {
				console.warn('暂未开启转换rem')
				return
			}
			var a = document.querySelectorAll('style')[0].innerHTML
			var req = a || null
			var fontSize = 20 //20rem
			function dom() {
				var test = /\d(.*?)px/g //匹配开头为数字的正则
				var c = req.match(test) //获取到前面的数量
				var s = []
				s.push(...new Set(c))
				if (c !== null) {
					s.forEach(item => {
						var mu = parseFloat(item) + 'px'
						var zhenze = new RegExp(mu, 'g')
						req = req.replace(zhenze, (parseFloat(item) / fontSize) + 'rem')
					})
				}
			}
			dom()
			document.querySelectorAll('style')[0].innerHTML = req
			return
		}