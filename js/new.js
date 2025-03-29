// 欢迎动画处理
document.addEventListener('DOMContentLoaded', function() {
	// 初始化动画元素
	setTimeout(() => {
		const firstAnimate = document.querySelector('.section-animate');
		if (firstAnimate) {
			firstAnimate.classList.add('visible');
		}
	}, 500);

	// 触发一次滚动事件，初始化可见区域内的动画
	setTimeout(() => {
		window.dispatchEvent(new Event('scroll'));
	}, 800);

	// 滚动进度条处理
	const scrollProgress = document.querySelector('.scroll-progress');
	const backToTop = document.querySelector('.back-to-top');

	// 页面滚动处理
	window.addEventListener('scroll', () => {
		// 计算滚动进度
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight - document.documentElement
			.clientHeight;
		const scrollPercent = (scrollTop / scrollHeight) * 100;

		// 更新进度条
		scrollProgress.style.width = scrollPercent + '%';

		// 显示/隐藏回到顶部按钮
		if (scrollTop > 300) {
			backToTop.classList.add('visible');
		} else {
			backToTop.classList.remove('visible');
		}

		// 滚动动画
		const animateElements = document.querySelectorAll('.section-animate');
		animateElements.forEach(element => {
			const elementTop = element.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;
			if (elementTop < windowHeight * 0.8) {
				element.classList.add('visible');
			}
		});
	});

	// 回到顶部点击事件
	backToTop.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	// 自定义鼠标处理
	const cursor = document.querySelector('.cursor');
	const cursorFollower = document.querySelector('.cursor-follower');
	const focusEffect = document.querySelector('.focus-effect');

	let mouseX = 0;
	let mouseY = 0;
	let followerX = 0;
	let followerY = 0;

	// 使用requestAnimationFrame进行平滑更新
	const updateCursor = () => {
		// 使用缓动效果使follower平滑跟随
		followerX += (mouseX - followerX) * 0.1;
		followerY += (mouseY - followerY) * 0.1;

		// 应用位置
		cursor.style.left = `${mouseX}px`;
		cursor.style.top = `${mouseY}px`;

		cursorFollower.style.left = `${followerX}px`;
		cursorFollower.style.top = `${followerY}px`;

		focusEffect.style.left = `${mouseX}px`;
		focusEffect.style.top = `${mouseY}px`;

		// 继续动画循环
		requestAnimationFrame(updateCursor);
	};

	// 开始动画循环
	updateCursor();

	// 鼠标移动时更新位置
	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// 当页面滚动时，更新相对于视口的位置
	document.addEventListener('scroll', () => {
		// 不需要额外操作，因为使用clientX/Y是相对于视口的
	});

	// 点击效果
	document.addEventListener('mousedown', () => {
		cursor.classList.add('active');
		cursorFollower.classList.add('active');
	});

	document.addEventListener('mouseup', () => {
		cursor.classList.remove('active');
		cursorFollower.classList.remove('active');
	});

	// 对可点击元素增加悬停效果
	const clickables = document.querySelectorAll('a, button, .project-card, .tech-tag, ul.skills li');

	clickables.forEach(element => {
		element.addEventListener('mouseenter', () => {
			cursor.classList.add('active');
			cursorFollower.classList.add('active');
			focusEffect.classList.add('active');
		});

		element.addEventListener('mouseleave', () => {
			cursor.classList.remove('active');
			cursorFollower.classList.remove('active');
			focusEffect.classList.remove('active');
		});
	});

	// 确保鼠标在离开窗口后重新进入时能正确显示
	document.addEventListener('mouseenter', () => {
		cursor.style.opacity = '1';
		cursorFollower.style.opacity = '1';
	});

	document.addEventListener('mouseleave', () => {
		cursor.style.opacity = '0';
		cursorFollower.style.opacity = '0';
	});

	// 欢迎动画
	const welcomeScreen = document.querySelector('.welcome-screen');
	const welcomeText = document.querySelector('.welcome-text');
	const welcomeEmoji = document.querySelector('.welcome-emoji');
	const contentWrapper = document.querySelector('.content-wrapper');

	// 显示欢迎文字
	setTimeout(() => {
		welcomeText.classList.add('visible');
		welcomeEmoji.classList.add('wave-animation');
	}, 300);

	// 隐藏欢迎屏幕，显示内容
	setTimeout(() => {
		welcomeScreen.classList.add('fade-out');
		contentWrapper.classList.add('visible');

		// 在动画完成后完全移除欢迎屏幕
		setTimeout(() => {
			welcomeScreen.style.display = 'none';
		}, 800);
	}, 2000);
});

document.getElementById("theme-toggle").addEventListener("click", function() {
	// 获取覆盖层元素
	const overlay = document.querySelector('.theme-transition-overlay');

	// 获取点击位置作为动画起点
	const rect = this.getBoundingClientRect();
	const clickX = rect.left + rect.width / 2;
	const clickY = rect.top + rect.height / 2;

	// 设置动画起点为点击位置
	overlay.style.background =
		`radial-gradient(circle at ${clickX}px ${clickY}px, transparent 0%, ${document.body.classList.contains('dark-theme') ? '#ffffff' : '#1a1a1a'} 100%)`;

	// 触发动画
	overlay.style.opacity = '0.6';

	// 延迟执行主题切换，以便动画先执行
	setTimeout(() => {
		document.body.classList.toggle("dark-theme");
		[...document.querySelectorAll("h2, p")].forEach(element => {
			element.classList.toggle("dark-theme");
		});

		// 更新SVG背景颜色
		const paths = document.querySelectorAll('#wave-background path');
		paths.forEach(path => {
			path.setAttribute('stroke', document.body.classList.contains('dark-theme') ?
				'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)');
		});

		// 淡出覆盖层
		setTimeout(() => {
			overlay.style.opacity = '0';
		}, 300);
	}, 200);
});

class SVG {
	constructor() {
		this.ratio = 420 / 297
		this.fixedHeight = window.innerHeight
		this.isMobile = window.innerWidth <= 768

		this.el = document.querySelector('#wave-background')

		this.resizeHandler()
		// 使用防抖优化resize事件
		this.debouncedResize = this.debounce(this.resizeHandler.bind(this), 150)
		window.addEventListener('resize', this.debouncedResize)
	}

	debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	resizeHandler() {
		this.height = window.innerHeight
		this.width = window.innerWidth
		this.isMobile = window.innerWidth <= 768

		this.el.setAttribute('width', this.width.toFixed(2))
		this.el.setAttribute('height', this.height.toFixed(2))
	}
}

class Scene {
	constructor(svg) {
		this.svg = svg
		this.isPaused = false
		window.addEventListener('resize', this.debounce(this.resizeHandler.bind(this), 150))

		// 根据设备类型设置不同的参数
		if (this.svg.isMobile) {
			this.maxLines = 30 // 移动端减少线条数量
			this.maxPoints = 6 // 移动端减少点的数量
			this.strokeOpacity = 0.25 // 移动端加深线条
		} else {
			this.maxLines = 50
			this.maxPoints = 8
			this.strokeOpacity = 0.15
		}

		// 使用requestAnimationFrame的时间戳
		this.lastFrame = 0
		this.frameInterval = 1000 / 30 // 限制到30fps
	}

	debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	resizeHandler() {
		this.generate()
	}

	generate() {
		this.lines = []

		// 根据设备类型调整间距
		const baseGap = this.svg.isMobile ? 40 : 60
		this.maxLines = Math.floor(this.svg.width / baseGap)
		this.maxPoints = Math.floor(this.svg.height / (this.svg.isMobile ? 80 : 120))

		this.gapX = this.svg.width / (this.maxLines - 1)
		this.gapY = this.svg.height / (this.maxPoints - 1)

		for (let i = 0; i < this.maxLines; i++) {
			const points = []
			let x = i * this.gapX

			for (let j = 0; j < this.maxPoints; j++) {
				points.push({
					offsetX: 0,
					offsetY: 0,
					x: x,
					y: j * this.gapY
				})
			}

			this.lines.push({
				points
			})
		}

		this.animate()
	}

	move(time) {
		const amplitude = this.svg.isMobile ? 25 : 15 // 移动端增加波动幅度

		this.lines.forEach(line => {
			line.points.forEach((point, index) => {
				if (index === 0 || index === line.points.length - 1) {
					point.offsetX = 0
					point.offsetY = 0
					return
				}
				// 减少三角函数计算频率，移动端增加波动幅度
				point.offsetY = Math.cos(point.x * 0.01 + (time * 0.0001)) * amplitude
				point.offsetX = Math.sin((point.y + point.offsetY) * 0.008 + (time * 0.00008)) *
					this.gapX
			})
		})
	}

	draw() {
		this.svg.el.innerHTML = ''
		const paths = document.createDocumentFragment()

		this.lines.forEach(line => {
			let d = ''
			line.points.forEach((point, index) => {
				const x = point.x + point.offsetX
				const y = point.y + point.offsetY

				if (index === 0) {
					d += `M ${x},${y}`
				} else {
					const prevPoint = line.points[index - 1]
					const cx = (prevPoint.x + point.x) / 2
					const cy = (prevPoint.y + point.y + prevPoint.offsetY + point.offsetY) / 2
					d += ` Q ${cx},${cy} ${x},${y}`
				}
			})

			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
			path.setAttribute('fill', 'none')
			path.setAttribute('stroke', document.body.classList.contains('dark-theme') ?
				`rgba(255,255,255,${this.svg.isMobile ? 0.25 : 0.15})` :
				`rgba(0,0,0,${this.svg.isMobile ? 0.25 : 0.15})`)
			path.setAttribute('stroke-width', this.svg.isMobile ? '1.5px' : '1px')
			path.setAttribute('d', d)
			paths.append(path)
		})

		this.svg.el.append(paths)
	}

	animate() {
		this.startTime = performance.now()
		if (this.raf) {
			cancelAnimationFrame(this.raf)
		}
		this.tick()
	}

	tick(nowTime = 0) {
		if (!this.isPaused) {
			// 限制帧率
			if (nowTime - this.lastFrame >= this.frameInterval) {
				this.lastFrame = nowTime
				this.move(nowTime)
				this.draw()
			}
		}

		this.raf = requestAnimationFrame(this.tick.bind(this))
	}
}

// 初始化波浪动画
const scene = new Scene(new SVG())
scene.generate()