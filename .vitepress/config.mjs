import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      height: 100vh;
      overflow: hidden;
      background: #c0c0c0; /* 银灰底色 */
    }

    #dynamic-title {
      position: fixed;
      top: 20px;
      left: 20px;
      font-size: 2rem;
      font-weight: bold;
      mix-blend-mode: difference;
      transition: color 0.5s;
      z-index: 1000;
    }

    /* 光源画布容器 */
    #light-canvas {
      position: fixed;
      bottom: -50vh;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
  </style>
</head>
<body>
  <h1 id="dynamic-title">Lush World</h1>
  <canvas id="light-canvas"></canvas>

  <script>
    // 初始化光源画布
    const canvas = document.getElementById('light-canvas');
    const ctx = canvas.getContext('2d');
    let lightSize = 0;
    
    // 动态调整画布尺寸
    function resizeCanvas() {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight;
      ctx.resetTransform();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 光源动画逻辑
    function createLight() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 创建渐变光源
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height, 
        0, 
        canvas.width/2, canvas.height, 
        lightSize
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(1, 'rgba(192,192,192,0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 呼吸动画
      lightSize = (Math.sin(Date.now()/1000) * 100) + 200;
      requestAnimationFrame(createLight);
    }
    createLight();

    // 颜色检测与反色逻辑
    const title = document.getElementById('dynamic-title');
    const colorCanvas = document.createElement('canvas');
    const colorCtx = colorCanvas.getContext('2d');
    
    function updateTitleColor() {
      // 获取标题位置
      const rect = title.getBoundingClientRect();
      const x = rect.left + rect.width/2;
      const y = rect.top + rect.height/2;

      // 截取当前视图
      colorCanvas.width = 1;
      colorCanvas.height = 1;
      colorCtx.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1);
      
      // 获取像素数据
      const [r, g, b] = colorCtx.getImageData(0,0,1,1).data;
      
      // 动态反色算法
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
      title.style.color = luminance > 128 ? 'black' : 'white';
    }

    // 持续更新检测
    setInterval(updateTitleColor, 100);
    // 在 createLight 函数中添加随机扰动
lightSize += (Math.random() - 0.5) * 10; // 模拟烛光效果

// 添加鼠标互动
document.addEventListener('mousemove', (e) => {
  const dx = (e.clientX - window.innerWidth/2) * 0.1;
  lightSize = 300 + dx; 
});
  </script>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
  <style>
    /* 自定义光标样式 */
    .carrot-cursor {
      position: fixed;
      width: 32px;
      height: 48px;
      pointer-events: none;
      z-index: 9999;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 48"><path d="M16 2Q13 8 12 14c-1 6-1 12 0 18 1 6 3 12 4 16h-2c-2-4-4-10-5-16-1-6-1-12 1-18z" fill="%23FF6B6B"/><path d="M16 4q-2 5-3 11-1 6 0 12 1 6 3 11h-2q-2-5-4-11-2-6-1-12 1-6 3-11z" fill="%23FF5252"/></svg>');
      background-size: contain;
      transition: 
        transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        filter 0.2s;
    }

    /* 点击动画 */
    .click-animation {
      animation: carrot-click 0.4s ease-out;
    }

    @keyframes carrot-click {
      0% { transform: translate(-50%, -50%) scale(1); }
      30% { transform: translate(-50%, -50%) scale(0.8); }
      60% { transform: translate(-50%, -50%) scale(1.2); }
      100% { transform: translate(-50%, -50%) scale(1); }
    }

    /* 悬停效果 */
    :hover > .carrot-cursor {
      filter: brightness(1.1);
    }

    /* 禁用默认光标 */
    html, * {
      cursor: none !important;
    }
  </style>
</head>
<body>
  <div class="carrot-cursor"></div>

  <script>
    const cursor = document.querySelector('.carrot-cursor');
    
    // 光标跟随
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // 点击动画
    document.addEventListener('click', (e) => {
      cursor.classList.add('click-animation');
      setTimeout(() => {
        cursor.classList.remove('click-animation');
      }, 400);

      // 添加粒子效果
      createParticles(e.clientX, e.clientY);
    });

    // 粒子动画效果（可选）
    function createParticles(x, y) {
      for(let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          width: 6px;
          height: 6px;
          background: #FF9F43;
          border-radius: 50%;
          pointer-events: none;
          animation: particle-fly 0.8s ease-out;
        `;

        // 随机运动方向
        const angle = (Math.PI * 2) * Math.random();
        const velocity = 100 + Math.random() * 50;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        // 动画处理
        requestAnimationFrame(() => {
          particle.style.transform = `
            translate(
              ${Math.cos(angle) * velocity}px,
              ${Math.sin(angle) * velocity}px
            )
          `;
          particle.style.opacity = 0;
        });

        // 移除元素
        setTimeout(() => particle.remove(), 800);
      }
    }

    // 粒子动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particle-fly {
        0% { transform: translate(0,0); opacity:1; }
        100% { opacity:0; }
      }
    `;
    document.head.appendChild(style);
    // 在 mousemove 监听器中添加：
const trail = cursor.cloneNode();
trail.style.opacity = 0.5;
document.body.appendChild(trail);
setTimeout(() => trail.remove(), 1000);
    // 点击时播放音效
const crunchSound = new Audio('data:audio/wav;base64,UklGRl9...');
document.addEventListener('click', () => {
  crunchSound.currentTime = 0;
  crunchSound.play();
});
    // 在点击事件中添加：
const hue = (x / window.innerWidth) * 360;
cursor.style.filter = `hue-rotate(${hue}deg)`;
// 替换原有的 mousemove 监听代码为：
let posX = window.innerWidth/2, 
    posY = window.innerHeight/2,
    targetX = posX, 
    targetY = posY,
    velocity = 0;

// 平滑移动逻辑
function smoothMove() {
  const deltaX = targetX - posX;
  const deltaY = targetY - posY;
  
  // 动态惯性系数
  const inertia = Math.min(Math.sqrt(deltaX**2 + deltaY**2) * 0.02, 0.3);
  
  posX += deltaX * inertia;
  posY += deltaY * inertia;
  
  cursor.style.transform = `translate(
    ${posX - cursor.offsetWidth/2}px, 
    ${posY - cursor.offsetHeight/2}px
  ) rotate(${deltaX * 0.3}deg)`;
  
  requestAnimationFrame(smoothMove);
}
smoothMove();

// 更新目标位置
document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});
// 在点击事件中添加位置偏移补偿
document.addEventListener('click', (e) => {
  const realX = posX - 24; // 根据transform-origin调整
  const realY = posY - 32;
  // 后续点击逻辑使用realX/realY
});
// 使用OffscreenCanvas渲染拖尾
const trailCanvas = new OffscreenCanvas(256, 256);
const trailCtx = trailCanvas.getContext('2d');

// 在Web Worker中处理轨迹渲染
if ('Worker' in window) {
  const worker = new Worker('cursor-worker.js');
  worker.postMessage({ type: 'init', canvas: trailCanvas });
}
  </script>
</body>
</html>
export default defineConfig({
  title: "Lush",
  base: '/vitehub/',
  description: "XsUo",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
