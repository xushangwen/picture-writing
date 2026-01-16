# 看图写话小助手

AI 辅助的看图写话练习平台，帮助小学低年级学生在"玩"中提升写作能力。

## 功能特点

- 🎨 **AI 生图**：使用 Gemini 生成适合儿童的卡通风格图片
- ✍️ **智能评分**：五维度评分（内容、语句、想象、用词、标点）
- 💡 **温和建议**：以鼓励为主的评价方式
- ✨ **范文参考**：AI 生成的优秀示例

## 技术栈

- Next.js 15 + React 19
- Tailwind CSS v4
- Framer Motion
- Zustand
- Google Gemini API

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Gemini API Key：
```
GEMINI_API_KEY=your_api_key_here
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登录 Google 账号
3. 点击 "Create API Key" 创建密钥
4. 复制密钥到 `.env.local` 文件

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   └── api/
│       ├── generate-image/   # 图片生成 API
│       └── evaluate/         # AI 评分 API
├── components/
│   ├── TypeSelector.tsx      # 类型选择器
│   ├── ImageDisplay.tsx      # 图片展示
│   ├── WritingArea.tsx       # 写作输入区
│   └── ScorePanel.tsx        # 评分展示
├── lib/
│   ├── gemini.ts             # Gemini API 封装
│   └── prompts.ts            # Prompt 模板
├── store/
│   └── appStore.ts           # 状态管理
└── types/
    └── index.ts              # 类型定义
```

## License

MIT
