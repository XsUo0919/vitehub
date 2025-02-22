// .vitepress/config.mjs
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 基础配置
  title: 'Your Site Name', // 网站标题
  description: 'Your Site Description', // 网站描述
  base: '/', // 部署基础路径
  
  // 主题配置
  themeConfig: {
    logo: '/logo.svg', // 导航栏图标
    
    // 导航菜单
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'About', link: '/about' }
    ],
    
    // 侧边栏配置
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/intro' },
          { text: 'Installation', link: '/install' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Performance', link: '/performance' },
          { text: 'Deployment', link: '/deploy' }
        ]
      }
    ],
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourname' },
      { icon: 'twitter', link: 'https://twitter.com/yourname' }
    ]
  },
  
  // Markdown 扩展配置
  markdown: {
    lineNumbers: true, // 显示代码行号
    theme: 'material-theme-palenight', // 代码主题
    
    // Markdown 扩展
    config: (md) => {
      md.use(require('markdown-it-task-lists'))
    }
  },
  
  // Vite 构建配置
  vite: {
    esbuild: {
      loader: 'jsx', // 启用 JSX 支持
      include: /\.(jsx|tsx)$/
    },
    plugins: [
      // 可添加 Vite 插件
    ]
  }
})
