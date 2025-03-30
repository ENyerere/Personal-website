/**
 * 个人主页交互效果
 * 包含：主题切换、动画效果、自定义鼠标、滚动效果等功能
 */

// DOM加载完成后执行主函数
document.addEventListener('DOMContentLoaded', function () {
	// 初始化各个功能模块
	initScrollAnimations();
	initCustomCursor();
	initWelcomeAnimation();
	initThemeToggle();

	// 初始化波浪动画
	const svgController = new SVG();
	const scene = new Scene(svgController);
	scene.generate();
});

/**
 * 初始化滚动相关动画和效果
 */
function initScrollAnimations() {
	// 获取需要操作的DOM元素
	const scrollProgress = document.querySelector('.scroll-progress');
	const backToTop = document.querySelector('.back-to-top');
	const animateElements = document.querySelectorAll('.section-animate');

	// 初始化首个动画元素
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

	// 页面滚动处理
	window.addEventListener('scroll', () => {
		// 更新滚动进度条
		updateScrollProgress(scrollProgress);

		// 控制回到顶部按钮显示/隐藏
		toggleBackToTopButton(backToTop);

		// 处理滚动动画
		animateOnScroll(animateElements);
	});

	// 回到顶部按钮点击事件
	backToTop.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

/**
 * 更新滚动进度条
 * @param {HTMLElement} progressBar - 进度条元素
 */
function updateScrollProgress(progressBar) {
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrollPercent = (scrollTop / scrollHeight) * 100;

	progressBar.style.width = scrollPercent + '%';
}

/**
 * 控制回到顶部按钮的显示和隐藏
 * @param {HTMLElement} button - 回到顶部按钮元素
 */
function toggleBackToTopButton(button) {
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

	if (scrollTop > 300) {
		button.classList.add('visible');
	} else {
		button.classList.remove('visible');
	}
}

/**
 * 处理元素的滚动显示动画
 * @param {NodeList} elements - 需要动画的元素集合
 */
function animateOnScroll(elements) {
	elements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;

		if (elementTop < windowHeight * 0.8) {
			element.classList.add('visible');
		}
	});
}

/**
 * 初始化自定义鼠标效果
 */
function initCustomCursor() {
	// 获取自定义鼠标相关元素
	const cursor = document.querySelector('.cursor');
	const cursorFollower = document.querySelector('.cursor-follower');
	const focusEffect = document.querySelector('.focus-effect');

	// 鼠标位置变量
	let mouseX = 0;
	let mouseY = 0;
	let followerX = 0;
	let followerY = 0;

	// 使用requestAnimationFrame进行平滑更新
	function updateCursor() {
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
	}

	// 开始动画循环
	updateCursor();

	// 鼠标移动时更新位置
	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
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

	// 处理可点击元素的悬停效果
	setupHoverEffects(cursor, cursorFollower, focusEffect);

	// 确保鼠标在离开窗口后重新进入时能正确显示
	document.addEventListener('mouseenter', () => {
		cursor.style.opacity = '1';
		cursorFollower.style.opacity = '1';
	});

	document.addEventListener('mouseleave', () => {
		cursor.style.opacity = '0';
		cursorFollower.style.opacity = '0';
	});
}

/**
 * 为可交互元素设置悬停效果
 * @param {HTMLElement} cursor - 主光标元素
 * @param {HTMLElement} follower - 跟随光标元素
 * @param {HTMLElement} focusEffect - 聚焦效果元素
 */
function setupHoverEffects(cursor, follower, focusEffect) {
	const clickables = document.querySelectorAll('a, button, .project-card, .tech-tag, ul.skills li');

	clickables.forEach(element => {
		element.addEventListener('mouseenter', () => {
			cursor.classList.add('active');
			follower.classList.add('active');
			focusEffect.classList.add('active');
		});

		element.addEventListener('mouseleave', () => {
			cursor.classList.remove('active');
			follower.classList.remove('active');
			focusEffect.classList.remove('active');
		});
	});
}

/**
 * 初始化欢迎动画
 */
function initWelcomeAnimation() {
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
}

/**
 * 初始化主题切换功能
 */
function initThemeToggle() {
	document.getElementById("theme-toggle").addEventListener("click", function () {
		// 获取覆盖层元素
		const overlay = document.querySelector('.theme-transition-overlay');

		// 创建径向渐变动画效果
		createThemeTransitionEffect(this, overlay);

		// 延迟执行主题切换，以便动画先执行
		setTimeout(() => {
			toggleTheme();

			// 淡出覆盖层
			setTimeout(() => {
				overlay.style.opacity = '0';
			}, 300);
		}, 200);
	});
}

/**
 * 创建主题切换的过渡动画效果
 * @param {HTMLElement} button - 主题切换按钮
 * @param {HTMLElement} overlay - 过渡效果覆盖层
 */
function createThemeTransitionEffect(button, overlay) {
	// 获取点击位置作为动画起点
	const rect = button.getBoundingClientRect();
	const clickX = rect.left + rect.width / 2;
	const clickY = rect.top + rect.height / 2;

	// 设置动画起点为点击位置
	const targetColor = document.body.classList.contains('dark-theme') ? '#ffffff' : '#1a1a1a';
	overlay.style.background = `radial-gradient(circle at ${clickX}px ${clickY}px, transparent 0%, ${targetColor} 100%)`;

	// 触发动画
	overlay.style.opacity = '0.6';
}

/**
 * 切换网站主题
 */
function toggleTheme() {
	// 切换主题类
	document.body.classList.toggle("dark-theme");

	// 更新文本元素主题
	[...document.querySelectorAll("h2, p")].forEach(element => {
		element.classList.toggle("dark-theme");
	});

	// 更新SVG背景颜色
	const paths = document.querySelectorAll('#wave-background path');
	paths.forEach(path => {
		path.setAttribute('stroke',
			document.body.classList.contains('dark-theme') ?
				'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
		);
	});
}

/**
 * SVG背景控制类
 * 负责SVG元素的尺寸和属性管理
 */
class SVG {
	/**
	 * 初始化SVG控制器
	 */
	constructor() {
		this.ratio = 420 / 297;
		this.fixedHeight = window.innerHeight;
		this.isMobile = window.innerWidth <= 768;
		this.el = document.querySelector('#wave-background');

		// 初始化尺寸
		this.resizeHandler();

		// 使用防抖优化resize事件
		this.debouncedResize = this.debounce(this.resizeHandler.bind(this), 150);
		window.addEventListener('resize', this.debouncedResize);
	}

	/**
	 * 防抖函数，避免频繁触发
	 * @param {Function} func - 要执行的函数
	 * @param {number} wait - 等待时间（毫秒）
	 * @returns {Function} 防抖后的函数
	 */
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

	/**
	 * 窗口尺寸变化处理函数
	 */
	resizeHandler() {
		this.height = window.innerHeight;
		this.width = window.innerWidth;
		this.isMobile = window.innerWidth <= 768;

		this.el.setAttribute('width', this.width.toFixed(2));
		this.el.setAttribute('height', this.height.toFixed(2));
	}
}

/**
 * 场景控制类
 * 负责创建和管理波浪动画
 */
class Scene {
	/**
	 * 初始化场景
	 * @param {SVG} svg - SVG控制器实例
	 */
	constructor(svg) {
		this.svg = svg;
		this.isPaused = false;
		this.lines = [];

		// 监听窗口尺寸变化
		window.addEventListener('resize', this.debounce(this.resizeHandler.bind(this), 150));

		// 根据设备类型设置不同的参数
		this.updateParams();

		// 动画控制参数
		this.lastFrame = 0;
		this.frameInterval = 1000 / 30; // 限制到30fps
	}

	/**
	 * 更新动画参数
	 */
	updateParams() {
		if (this.svg.isMobile) {
			this.maxLines = 30; // 移动端减少线条数量
			this.maxPoints = 6; // 移动端减少点的数量
			this.strokeOpacity = 0.25; // 移动端加深线条
		} else {
			this.maxLines = 50;
			this.maxPoints = 8;
			this.strokeOpacity = 0.15;
		}
	}

	/**
	 * 防抖函数
	 * @param {Function} func - 要执行的函数
	 * @param {number} wait - 等待时间（毫秒）
	 * @returns {Function} 防抖后的函数
	 */
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

	/**
	 * 窗口尺寸变化处理
	 */
	resizeHandler() {
		this.updateParams();
		this.generate();
	}

	/**
	 * 生成波浪线点
	 */
	generate() {
		this.lines = [];

		// 根据设备类型调整间距
		const baseGap = this.svg.isMobile ? 40 : 60;
		this.maxLines = Math.floor(this.svg.width / baseGap);
		this.maxPoints = Math.floor(this.svg.height / (this.svg.isMobile ? 80 : 120));

		this.gapX = this.svg.width / (this.maxLines - 1);
		this.gapY = this.svg.height / (this.maxPoints - 1);

		// 生成点阵
		for (let i = 0; i < this.maxLines; i++) {
			const points = [];
			let x = i * this.gapX;

			for (let j = 0; j < this.maxPoints; j++) {
				points.push({
					offsetX: 0,
					offsetY: 0,
					x: x,
					y: j * this.gapY
				});
			}

			this.lines.push({
				points
			});
		}

		this.animate();
	}

	/**
	 * 移动点的位置（应用波动效果）
	 * @param {number} time - 当前时间戳
	 */
	move(time) {
		const amplitude = this.svg.isMobile ? 25 : 15; // 移动端增加波动幅度

		this.lines.forEach(line => {
			line.points.forEach((point, index) => {
				// 固定首尾点，保持边缘平滑
				if (index === 0 || index === line.points.length - 1) {
					point.offsetX = 0;
					point.offsetY = 0;
					return;
				}

				// 应用波动效果
				point.offsetY = Math.cos(point.x * 0.01 + (time * 0.0001)) * amplitude;
				point.offsetX = Math.sin((point.y + point.offsetY) * 0.008 + (time * 0.00008)) * this.gapX;
			});
		});
	}

	/**
	 * 绘制SVG路径
	 */
	draw() {
		this.svg.el.innerHTML = '';
		const paths = document.createDocumentFragment();

		this.lines.forEach(line => {
			let d = '';

			// 构建SVG路径数据
			line.points.forEach((point, index) => {
				const x = point.x + point.offsetX;
				const y = point.y + point.offsetY;

				if (index === 0) {
					d += `M ${x},${y}`;
				} else {
					// 使用二次贝塞尔曲线连接点，使线条更平滑
					const prevPoint = line.points[index - 1];
					const cx = (prevPoint.x + point.x) / 2;
					const cy = (prevPoint.y + point.y + prevPoint.offsetY + point.offsetY) / 2;
					d += ` Q ${cx},${cy} ${x},${y}`;
				}
			});

			// 创建并设置路径元素
			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('fill', 'none');
			path.setAttribute('stroke', document.body.classList.contains('dark-theme') ?
				`rgba(255,255,255,${this.svg.isMobile ? 0.25 : 0.15})` :
				`rgba(0,0,0,${this.svg.isMobile ? 0.25 : 0.15})`);
			path.setAttribute('stroke-width', this.svg.isMobile ? '1.5px' : '1px');
			path.setAttribute('d', d);
			paths.append(path);
		});

		this.svg.el.append(paths);
	}

	/**
	 * 开始动画
	 */
	animate() {
		this.startTime = performance.now();
		if (this.raf) {
			cancelAnimationFrame(this.raf);
		}
		this.tick();
	}

	/**
	 * 动画帧处理函数
	 * @param {number} nowTime - 当前时间戳
	 */
	tick(nowTime = 0) {
		if (!this.isPaused) {
			// 限制帧率，优化性能
			if (nowTime - this.lastFrame >= this.frameInterval) {
				this.lastFrame = nowTime;
				this.move(nowTime);
				this.draw();
			}
		}

		this.raf = requestAnimationFrame(this.tick.bind(this));
	}
}