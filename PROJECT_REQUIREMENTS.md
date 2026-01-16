# Picture Writing (AI 看图写话) - 项目需求文档 (PRD)

## 1. 项目概述
本项目是一个专为**小学一年级学生**设计的 AI 辅助学习应用，旨在通过"看图写话"的方式激发孩子的想象力和写作兴趣。
**核心流程**：选择练习类型 -> AI 生成趣味图片 -> 学生看图写作 -> AI 智能评分与反馈。

---

## 2. 技术栈 (Tech Stack)
- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **AI 模型**: Google Gemini Pro (用于评分) & Gemini Pro Vision (用于生图) 或兼容模型
- **字体**: 自定义圆体 (如 Ma Shan Zheng 或系统圆体)

---

## 3. 核心功能模块 (Core Features)

### 3.1 练习类型选择 (Type Selector)
- **四个核心类别**：
  1. **写人 (Person)**：人物特写、动作、神态。
  2. **写物 (Object)**：动物、静物、玩具。
  3. **写事 (Event)**：集体活动、节日、生活场景。
  4. **写景 (Scenery)**：自然风光、季节变化。
- **交互**：点击切换，伴随平滑的动画过渡。

### 3.2 AI 图片生成 (Image Generation)
- **核心逻辑**：采用**原子化场景 (Atomic Scenarios)** 策略。
  - *痛点解决*：传统随机组合会导致逻辑冲突（如"冬天开花"）。
  - *解决方案*：预设逻辑闭环的场景包（Scenario），强制绑定季节、天气、色调和元素。
- **风格要求**：
  - 儿童插画风格 / 绘本风。
  - 线条干净，色彩明亮但不刺眼。
  - **严禁出现文字、字母、数字**。
  - 画面主体突出，背景不过于复杂。
  - 宽高比：16:9。

### 3.3 沉浸式写作区 (Writing Area)
- **输入体验**：
  - 极简文本域，去边框，背景透明。
  - 支持 Placeholder 提示（引导学生观察：有谁？在干什么？心情如何？）。
- **状态管理**：
  - **未生成图片时**：禁用输入，提示先生成图片。
  - **生成图片后**：启用输入。
  - **正在评分时**：锁定输入，显示 Loading 状态。
- **辅助功能**：
  - 实时字数统计（环形进度条）。
  - 最短字数限制（如 >5 字方可提交）。

### 3.4 AI 智能评分系统 (Smart Evaluation)
- **角色设定**：温柔、充满鼓励的小学语文老师。
- **评分维度 (100分制)**：
  1. **内容完整 (30%)**：要素是否齐全（谁、在哪、干什么）。
  2. **语句通顺 (25%)**：语病、连贯性。
  3. **想象力 (20%)**：细节描写、生动性。
  4. **词汇运用 (15%)**：用词准确度、丰富度。
  5. **标点符号 (10%)**：基本标点使用。
- **输出内容**：
  - 总分 & 星级 (1-5星)。
  - 维度得分。
  - **亮点 (Highlights)**：具体的表扬点。
  - **建议 (Suggestions)**：温和的改进建议。
  - **范文 (Sample)**：生成一篇80字左右的满分范文供参考。

---

## 4. UI/UX 设计规范 (Modern Minimalist)

### 4.1 视觉风格
- **关键词**：干净、温馨、精致、现代。
- **背景**：柔和的渐变色或噪点纹理，避免纯白枯燥。
- **卡片**：
  - 大圆角 (Rounded-3xl)。
  - **磨砂玻璃效果 (Glassmorphism)**：`bg-white/80 backdrop-blur-md`。
  - 柔和阴影 (Soft Shadows)。
- **布局**：
  - **Desktop**: 左右分栏。左侧大图展示，右侧写作与评分。
  - **Mobile**: 上下流式布局。图片置顶，下方跟随写作区。

### 4.2 交互细节
- 按钮悬停缩放效果。
- 评分面板展开时的弹簧动画。
- 加载状态必须有精致的骨架屏或 Loading 动画。

---

## 5. 核心业务逻辑 (Business Logic)

### 5.1 Prompt 策略 (关键)
必须在代码中硬编码 `Scenarios` 数据结构，严禁完全随机。
```typescript
interface Scenario {
  id: string;
  season?: string; // 风景特有
  weather?: string;
  location?: string; // 人物/物品特有
  elements: string[]; // 核心元素
  colors: string[]; // 色调氛围
  styles: string[];
}
// 示例：冬天必须绑定雪、冷色调、围巾，绝不能出现鲜花。
```

### 5.2 评分 Prompt 模板
System Prompt 需强调：
- 语气：小学语文老师，多鼓励。
- 拼音：允许用拼音代替汉字（OCR识别或输入时）。
- 标准：严格对应一年级水平，不要要求过高。

---

## 6. 目录结构建议
```
src/
├── app/
│   ├── api/
│   │   ├── generate-image/  # 生图 API
│   │   └── evaluate/        # 评分 API
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ImageDisplay.tsx     # 图片展示区
│   ├── WritingArea.tsx      # 写作区
│   ├── ScorePanel.tsx       # 评分结果面板
│   ├── TypeSelector.tsx     # 类型选择器
│   └── ui/                  # 基础 UI 组件
├── lib/
│   ├── gemini.ts            # AI 客户端封装
│   ├── prompts.ts           # 核心 Prompt 逻辑 (Atomic Scenarios)
│   └── utils.ts
├── types/
│   └── index.ts
└── store/
    └── appStore.ts          # Zustand 状态管理
```

## 7. 环境变量
```env
GEMINI_API_KEY=your_api_key_here
```
