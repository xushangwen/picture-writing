import { ImageType } from '@/types';

// 结构化提示词模板系统
// 核心思想：先选定逻辑合理的"场景模板"，再在模板允许的范围内随机填充细节
// 解决了纯随机带来的逻辑冲突问题（如"鱼在天上飞"），同时保留了极高的多样性

interface PromptTemplate {
  template: string; // 模板字符串，如 "{subject}在{location}{action}"
  variables: {
    [key: string]: string[]; // 变量池，如 subject: ['小猫', '小狗']
  };
  styles: string[]; // 风格池
}

const SCENE_TEMPLATES: Record<ImageType, PromptTemplate[]> = {
  // 人物类模板
  person: [
    {
      // 模板1：户外运动/玩耍
      template: '一个{subject}在{location}{action}，{style}，阳光明媚，充满活力',
      variables: {
        subject: ['活泼的小男孩', '可爱的小女孩', '运动型的小朋友', '开心的小学生'],
        location: ['公园的草坪上', '学校的操场上', '小区的花园里', '游乐园里', '体育场上'],
        action: ['快乐地踢足球', '开心地跳绳', '认真地跑步', '放飞纸飞机', '追逐蝴蝶', '骑着自行车', '玩滑板'],
      },
      styles: ['色彩鲜艳的卡通风格', '动感的插画风格', '活泼的绘本风格']
    },
    {
      // 模板2：安静学习/创作
      template: '一位{subject}在{location}{action}，{style}，画面温馨宁静',
      variables: {
        subject: ['文静的小女孩', '专注的小男孩', '慈祥的老奶奶', '年轻的老师', '认真的画家'],
        location: ['明亮的教室里', '安静的图书馆里', '温馨的书房里', '树荫下的长椅上', '窗台边'],
        action: ['认真地看书', '专心地画画', '练习写字', '做手工', '观察植物', '思考问题'],
      },
      styles: ['清新的水彩风格', '温馨的插画风格', '柔和的卡通风格']
    },
    {
      // 模板3：职业/角色扮演
      template: '一位{subject}在{location}{action}，{style}，构图简单清晰',
      variables: {
        subject: ['勇敢的消防员叔叔', '和蔼的医生阿姨', '辛勤的园丁伯伯', '负责的警察叔叔', '专业的厨师'],
        location: ['城市街道上', '医院诊室里', '美丽的花园中', '繁忙的厨房里', '消防车旁'],
        action: ['帮助需要的人', '给小朋友检查身体', '修剪花草', '指挥交通', '制作美味的蛋糕'],
      },
      styles: ['职业感的卡通风格', '生动的插画风格', '扁平化设计风格']
    },
    {
      // 模板4：家庭/生活
      template: '一个{subject}在{location}{action}，{style}，充满爱的氛围',
      variables: {
        subject: ['懂事的小男孩', '乖巧的小女孩', '慈祥的爷爷', '温柔的妈妈'],
        location: ['温馨的客厅里', '整洁的厨房里', '阳台上', '餐桌旁'],
        action: ['帮忙做家务', '浇花', '整理玩具', '准备晚餐', '喂宠物', '叠衣服'],
      },
      styles: ['温暖的家庭插画风格', '可爱的卡通风格', '柔和色调风格']
    }
  ],

  // 物品类模板
  object: [
    {
      // 模板1：陆地小动物
      template: '一只{characteristic}{subject}在{location}，{style}，呆萌可爱',
      variables: {
        characteristic: ['毛茸茸的', '圆滚滚的', '机灵的', '胖嘟嘟的', '小小的'],
        subject: ['小猫咪', '小狗', '小兔子', '小松鼠', '小仓鼠', '熊猫宝宝'],
        location: ['柔软的垫子上睡觉', '草地上打滚', '树下吃东西', '花丛中玩耍', '篮子里休息'],
      },
      styles: ['萌系卡通风格', '细腻的插画风格', '温暖的治愈风格']
    },
    {
      // 模板2：飞行生物
      template: '一只{characteristic}{subject}{location}，{style}，色彩斑斓',
      variables: {
        characteristic: ['漂亮的', '五彩斑斓的', '轻盈的', '可爱的'],
        subject: ['蝴蝶', '小鸟', '蜻蜓', '蜜蜂', '鹦鹉'],
        location: ['停在花朵上', '飞舞在花丛中', '站在树枝上唱歌', '在蓝天中飞翔'],
      },
      styles: ['唯美的绘本风格', '清新的水彩风格', '精致的插画风格']
    },
    {
      // 模板3：静物/玩具
      template: '一个{characteristic}{subject}放在{location}，{style}，光影柔和',
      variables: {
        characteristic: ['红彤彤的', '精致的', '可爱的', '崭新的', '漂亮的'],
        subject: ['大苹果', '闹钟', '玩具熊', '书包', '足球', '礼物盒', '生日蛋糕'],
        location: ['木质书桌上', '窗台上', '床头柜上', '野餐垫上', '书架上'],
      },
      styles: ['写实卡通风格', '简约插画风格', '静物画风格']
    },
    {
      // 模板4：交通工具
      template: '一辆{subject}在{location}，{style}，画面动感',
      variables: {
        subject: ['红色小汽车', '黄色校车', '蓝色小卡车', '帅气的警车', '可爱的冰淇淋车'],
        location: ['宽阔的马路上行驶', '蜿蜒的山路上', '城市街道上穿梭', '彩虹桥上开过'],
      },
      styles: ['扁平化卡通风格', '酷炫插画风格', '交通科普风格']
    }
  ],

  // 事件类模板
  event: [
    {
      // 模板1：集体活动
      template: '{participants}在{location}{activity}，{atmosphere}，{style}',
      variables: {
        participants: ['一群小朋友', '同学们', '一家人', '好朋友们'],
        location: ['公园的草坪上', '学校操场上', '沙滩上', '游乐园里'],
        activity: ['开心地野餐', '玩老鹰捉小鸡', '进行拔河比赛', '一起堆沙堡', '放风筝'],
        atmosphere: ['充满了欢声笑语', '气氛热烈', '大家都很开心', '场面温馨'],
      },
      styles: ['热闹的卡通风格', '全景插画风格', '活力四射风格']
    },
    {
      // 模板2：节日/庆典
      template: '{participants}正在{location}{activity}，{style}，{atmosphere}',
      variables: {
        participants: ['全家人', '小朋友们', '师生们'],
        location: ['装饰漂亮的房间里', '舞台上', '广场上'],
        activity: ['庆祝生日', '举办新年晚会', '表演节目', '唱生日歌', '做游戏'],
        atmosphere: ['喜气洋洋', '其乐融融', '温馨感人', '热闹非凡'],
      },
      styles: ['节日插画风格', '喜庆的卡通风格', '色彩丰富的风格']
    },
    {
      // 模板3：自然探索/教育
      template: '{participants}在{location}{activity}，{style}，寓教于乐',
      variables: {
        participants: ['好奇的小朋友', '科学小组', '老师和学生'],
        location: ['植物园里', '科学博物馆', '森林小径上', '小河边'],
        activity: ['观察昆虫', '种植小树苗', '做科学实验', '寻找落叶', '观察小蝌蚪'],
      },
      styles: ['科普插画风格', '清新的卡通风格', '探索主题风格']
    }
  ],

  // 风景类模板
  scenery: [
    {
      // 模板1：自然风光
      template: '{season}的{place}，{element}，{style}，宁静美好',
      variables: {
        season: ['春天', '夏天', '秋天', '冬天'],
        place: ['小山村', '森林公园', '田野', '湖边', '草原'],
        element: ['开满了鲜花', '绿树成荫', '金色的麦浪', '白雪皑皑', '小溪潺潺流过'],
      },
      styles: ['风景水彩风格', '治愈系插画风格', '唯美意境风格']
    },
    {
      // 模板2：天气/天象
      template: '{weather}的{place}，{detail}，{style}，令人陶醉',
      variables: {
        weather: ['雨后', '阳光明媚', '星光璀璨', '夕阳西下'],
        place: ['天空', '海边', '山顶', '城市上空'],
        detail: ['出现了一道彩虹', '云朵像棉花糖一样', '挂满了星星', '被染成了金黄色'],
      },
      styles: ['梦幻插画风格', '艺术感风格', '清新治愈风格']
    }
  ]
};

// 智能随机生成提示词
export function generateRandomPrompt(type: ImageType): string {
  // 1. 随机选择一个该类型的逻辑模板
  const templates = SCENE_TEMPLATES[type];
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  // 2. 填充模板变量
  let prompt = selectedTemplate.template;
  
  // 替换所有变量占位符 {key}
  Object.entries(selectedTemplate.variables).forEach(([key, values]) => {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    prompt = prompt.replace(`{${key}}`, randomValue);
  });
  
  // 3. 随机选择一种风格并替换 {style}
  if (prompt.includes('{style}')) {
    const randomStyle = selectedTemplate.styles[Math.floor(Math.random() * selectedTemplate.styles.length)];
    prompt = prompt.replace('{style}', randomStyle);
  }
  
  return prompt;
}

// 保留原有的固定提示词作为备用（可选）
export const IMAGE_PROMPTS: Record<ImageType, string[]> = {
  person: [
    '一个快乐的小朋友在阳光明媚的公园里玩耍，卡通风格，色彩明亮，构图简单清晰，适合儿童观看',
    '一位慈祥的奶奶在织毛衣，温馨的插画风格，温暖的氛围，画面简洁',
    '一个勇敢的消防员叔叔在帮助人们，卡通风格，英雄姿态，色彩鲜艳',
    '一个小女孩在认真读书，可爱的卡通风格，温馨的书房场景',
    '一个小男孩在帮妈妈做家务，温馨的家庭场景，卡通插画风格',
  ],
  object: [
    '一只毛茸茸的橘色小猫咪在软垫上睡觉，可爱的卡通风格，柔和的光线',
    '一只彩色的蝴蝶停在花朵上，儿童绘本插画风格，色彩缤纷',
    '一个红彤彤的苹果放在木桌上，简单的卡通风格，画面干净',
    '一只可爱的小狗在草地上奔跑，活泼的卡通风格，阳光明媚',
    '一盆绿油油的小植物在窗台上，清新的插画风格，温馨的场景',
  ],
  event: [
    '小朋友们在开生日派对，有蛋糕和气球，欢乐的卡通风格，热闹的氛围',
    '一家人在公园里野餐，温馨的插画风格，幸福的场景',
    '小朋友们在植树节种树，教育意义的卡通风格，阳光明媚',
    '小朋友在帮助老奶奶过马路，温暖的卡通风格，城市街道场景',
    '小朋友们在操场上做早操，活力四射的卡通风格，校园场景',
  ],
  scenery: [
    '雨后美丽的彩虹挂在绿色的山丘上，梦幻的插画风格，色彩绚丽',
    '春天的小村庄，樱花盛开，柔和的水彩风格，宁静美好',
    '阳光明媚的海滩上有沙堡，欢快的卡通风格，蓝天白云',
    '秋天的公园，落叶飘飘，温暖的插画风格，金黄色调',
    '冬天的雪景，小朋友在堆雪人，可爱的卡通风格，白雪皑皑',
  ],
};

// 随机获取一个 Prompt（使用新的动态生成）
export function getRandomPrompt(type: ImageType): string {
  // 使用动态生成，每次都是纯随机
  return generateRandomPrompt(type);
}

// AI 评分系统 Prompt
export const EVALUATION_SYSTEM_PROMPT = `你是一位温柔、充满鼓励的小学语文老师，通过"看图写话"激发一年级孩子的想象力和写作兴趣。你的目标是发现孩子作文中的闪光点，用温暖的语言给予正向反馈，小心翼翼地保护孩子的表达欲。

## 评分标准（满分100分，客观公正）

### 1. 内容完整（30分）
- 25-30分：完整描述画面核心要素（谁、在哪、干什么），内容充实
- 18-24分：基本描述画面，要素齐全但内容简单
- 10-17分：提到部分要素，描述不完整
- 0-9分：完全未动笔或与图片无关

### 2. 语句通顺（25分）
- 20-25分：句子通顺流畅，表达清晰，符合语法
- 15-19分：大部分句子通顺，偶有小语病但不影响理解
- 8-14分：句子不太通顺，影响部分理解
- 0-7分：语句混乱，难以理解

### 3. 想象力与生动性（20分）
- 15-20分：有丰富的想象和细节描写，生动有趣
- 10-14分：有一些想象或细节，描述较为生动
- 5-9分：能简单描述画面，但缺乏想象
- 0-4分：只是简单罗列物体或干巴巴的描述

### 4. 词汇运用（15分）
- 12-15分：词汇丰富，用词准确，有形容词、动词等多样化表达
- 8-11分：词汇基本准确，有一定变化
- 4-7分：词汇简单，重复较多
- 0-3分：词汇贫乏或用词不当

### 5. 标点符号（10分）
- 8-10分：标点使用正确，句读清晰
- 5-7分：标点基本正确，偶有遗漏或误用
- 2-4分：标点使用不规范，影响阅读
- 0-1分：全文无标点或标点混乱

## 评分原则（客观公正）

1.  **客观评分**：严格按照评分标准给分，不随意加分或减分
2.  **鼓励与要求并重**：在指出不足的同时，也要发现闪光点给予肯定
3.  **区分度合理**：确保不同水平的作文能够体现出合理的分数差异
4.  **拼音宽容**：完全接受拼音代替汉字

## 输出格式

请严格按照以下 JSON 格式输出：

{
  "score": 92,
  "stars": 5,
  "dimensions": {
    "content": 28,
    "fluency": 24,
    "imagination": 18,
    "vocabulary": 12,
    "punctuation": 10
  },
  "highlights": [
    "哇！你观察得真仔细，看到了...",
    "你用的'开心'这个词真棒，老师感受到了你的快乐！"
  ],
  "suggestions": [
    "下次可以试试告诉老师，天气怎么样呀？",
    "要是能给小猫起个名字就更有趣啦！"
  ],
  "sampleText": "这是一个范文示例..."
}

注意：
- score 是总分（0-100），必须等于 dimensions 各项之和
- stars 星级换算：90+为5星，80-89为4星，65-79为3星，50-64为2星，50以下为1星
- sampleText 写一段适合一年级水平的、充满童趣的范文（80字左右）`;

// 生成评分请求的用户 Prompt
export function getEvaluationUserPrompt(imageType: string, content: string): string {
  return `## 图片类型
${imageType}

## 学生作文
${content}

请根据以上内容进行评分，并严格按照 JSON 格式输出结果。`;
}
