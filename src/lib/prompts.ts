import { ImageType } from '@/types';

// ----------------------------------------------------------------------
// 原子化场景系统 (Atomic Scenarios)
// 核心思想：不再让变量自由组合，而是预设"逻辑闭环"的场景包。
// 解决问题：彻底杜绝"夜晚+金色"、"冬天+鲜花"等逻辑冲突。
// ----------------------------------------------------------------------

// 通用画面质量控制
const QUALITY_SUFFIX = "，杰作，高分辨率，8k画质，构图完美，电影级光照";

// ----------------------------------------------------------------------
// 1. 风景场景 (Scenery) - 严格绑定 天气 + 时间 + 色调 + 元素
// ----------------------------------------------------------------------

interface SceneryScenario {
  id: string;
  season: string;
  weather: string;     // 包含时间信息
  elements: string[];  // 这里的元素必须完全符合该特定的天气和季节
  colors: string[];    // 这里的色调必须符合该特定的光照
  styles: string[];
}

const SCENERY_SCENARIOS: SceneryScenario[] = [
  // --- 春天 ---
  {
    id: 'spring_day',
    season: '春天',
    weather: '阳光明媚的早晨',
    elements: ['盛开的粉色樱花', '嫩绿的柳条', '清澈的小溪', '飞舞的蝴蝶'],
    colors: ['粉嫩色调', '清新嫩绿', '明亮'],
    styles: ['水彩风格', '吉卜力风格']
  },
  {
    id: 'spring_rain',
    season: '春天',
    weather: '绵绵细雨中',
    elements: ['打着伞的行人', '湿润的石板路', '沾满雨露的绿叶', '朦胧的远山'],
    colors: ['清新蓝绿色', '柔和灰调', '通透'],
    styles: ['水墨画感', '治愈插画']
  },
  
  // --- 夏天 ---
  {
    id: 'summer_beach',
    season: '夏天',
    weather: '烈日当空的中午',
    elements: ['金色的沙滩', '蔚蓝的大海', '白色的海浪', '遮阳伞', '冰镇西瓜'],
    colors: ['高饱和度蓝', '金黄色', '明亮通透'],
    styles: ['新海诚风格', '高饱和卡通']
  },
  {
    id: 'summer_night',
    season: '夏天',
    weather: '宁静的夏夜',
    elements: ['漫天的繁星', '飞舞的萤火虫', '静谧的荷塘', '远处的灯火'],
    colors: ['深蓝色调', '紫色光晕', '点点微光'], // 确保夜景是深色的
    styles: ['梦幻插画', '唯美夜景']
  },

  // --- 秋天 ---
  {
    id: 'autumn_forest',
    season: '秋天',
    weather: '秋高气爽的午后',
    elements: ['满地的红枫叶', '金黄的银杏树', '成熟的南瓜', '松果'],
    colors: ['暖橙色', '金黄色', '浓郁'],
    styles: ['油画风格', '温暖童话']
  },

  // --- 冬天 ---
  {
    id: 'winter_snow',
    season: '冬天',
    weather: '大雪纷飞的白天',
    elements: ['厚厚的积雪', '堆好的雪人', '挂满雪的松树', '红色的屋顶'],
    colors: ['纯净白色', '冷蓝色', '明亮'],
    styles: ['冬季绘本', '极简风格']
  },
  {
    id: 'winter_fireplace',
    season: '冬天',
    weather: '寒冷冬夜的室内',
    elements: ['温暖的壁炉', '热气腾腾的可可', '窗花', '毛绒地毯'],
    colors: ['暖黄色火光', '温馨橙色', '对比强烈'],
    styles: ['室内温馨插画', '节日氛围']
  }
];

// ----------------------------------------------------------------------
// 2. 人物场景 (Person) - 严格绑定 地点 + 动作 + 主体
// ----------------------------------------------------------------------

interface PersonScenario {
  location: string;
  subjects: string[];
  actions: string[]; // 动作必须在该地点物理上可行
  vibe: string;
}

const PERSON_SCENARIOS: PersonScenario[] = [
  {
    location: '安静的图书馆角落',
    subjects: ['扎着马尾的小女孩', '戴眼镜的小男孩'],
    actions: ['全神贯注地看书', '在笔记本上写字', '踮起脚尖找书'],
    vibe: '安静专注，书香气息，柔和光线'
  },
  {
    location: '阳光下的操场',
    subjects: ['活泼的小男孩', '穿着运动服的小学生'],
    actions: ['快乐地踢足球', '奔跑追逐', '跳绳', '准备起跑'],
    vibe: '活力四射，动感十足，阳光明媚'
  },
  {
    location: '家里的厨房',
    subjects: ['穿着围裙的妈妈', '乖巧的小帮手'],
    actions: ['制作生日蛋糕', '洗水果', '摆放餐具'],
    vibe: '温馨幸福，充满烟火气，暖色调'
  },
  {
    location: '雨后的公园小径',
    subjects: ['穿着雨衣的小朋友', '打着伞的一家人'],
    actions: ['踩水坑', '观察蜗牛', '伸手接雨滴'],
    vibe: '清新有趣，童真童趣，倒影清晰'
  }
];

// ----------------------------------------------------------------------
// 3. 物品/动物场景 (Object) - 严格绑定 主体 + 环境
// ----------------------------------------------------------------------

interface ObjectScenario {
  category: string;
  subjects: string[];
  locations: string[]; // 必须是该物体出现的合理位置
  actions: string[];
}

const OBJECT_SCENARIOS: ObjectScenario[] = [
  {
    category: '宠物',
    subjects: ['橘色斑纹的小猫', '圆滚滚的小狗', '毛茸茸的仓鼠'],
    locations: ['柔软的布艺沙发上', '温暖的阳光下', '主人的拖鞋旁'],
    actions: ['蜷成一团睡觉', '歪着头好奇地看', '伸着懒腰'],
  },
  {
    category: '森林动物',
    subjects: ['机灵的小松鼠', '害羞的小鹿', '彩色的小鸟'],
    locations: ['粗壮的树枝上', '森林深处的草丛里', '布满青苔的石头上'],
    actions: ['捧着松果吃', '警觉地竖起耳朵', '梳理羽毛'],
  },
  {
    category: '美食',
    subjects: ['刚出炉的面包', '精致的小蛋糕', '红彤彤的苹果'],
    locations: ['木质餐桌上', '野餐垫上', '精美的盘子里'],
    actions: ['散发着热气', '点缀着水果', '光泽诱人'],
  }
];

// ----------------------------------------------------------------------
// 4. 事件场景 (Event) - 保持原有的强绑定逻辑
// ----------------------------------------------------------------------

const EVENT_SCENARIOS = [
  {
    scene: '生日派对',
    elements: ['三层生日蛋糕', '五彩缤纷的气球', '堆成山的礼物'],
    actions: ['吹灭蜡烛', '大家一起拍手', '切蛋糕'],
    vibe: '热闹非凡，暖黄灯光，喜庆'
  },
  {
    scene: '春节团圆',
    elements: ['大红灯笼', '贴着春联的门', '热腾腾的饺子'],
    actions: ['放鞭炮', '互相拜年', '全家举杯'],
    vibe: '中国红，传统年味，团圆'
  },
  {
    scene: '校园大扫除',
    elements: ['水桶和抹布', '整洁的玻璃', '扫把'],
    actions: ['擦黑板', '扫落叶', '浇花'],
    vibe: '劳动光荣，团结协作，明亮'
  }
];

// ----------------------------------------------------------------------
// 工具函数
// ----------------------------------------------------------------------

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomPrompt(type: ImageType): string {
  let finalPrompt = "";

  switch (type) {
    case 'scenery': {
      // 核心：直接选取一个完整的 Scenario，不再分别随机属性
      const scenario = getRandom(SCENERY_SCENARIOS);
      
      const element = getRandom(scenario.elements);
      const color = getRandom(scenario.colors);
      const style = getRandom(scenario.styles);
      
      finalPrompt = `一张风景画，${scenario.season}，${scenario.weather}，${scenario.id === 'summer_night' ? '画面整体偏暗' : ''}，画面重点是${element}，整体色调为${color}，${style}，光影协调，逻辑合理`;
      break;
    }

    case 'person': {
      const scenario = getRandom(PERSON_SCENARIOS);
      const subject = getRandom(scenario.subjects);
      const action = getRandom(scenario.actions);
      
      finalPrompt = `人物特写，地点在${scenario.location}，一个${subject}正在${action}，氛围${scenario.vibe}，迪士尼动画风格，表情生动`;
      break;
    }

    case 'object': {
      const scenario = getRandom(OBJECT_SCENARIOS);
      const subject = getRandom(scenario.subjects);
      const location = getRandom(scenario.locations);
      const action = getRandom(scenario.actions);
      
      finalPrompt = `静物特写，${location}，有一只${subject}，它正在${action}，3D皮克斯风格，光影细腻，背景虚化`;
      break;
    }

    case 'event': {
      const scenario = getRandom(EVENT_SCENARIOS);
      const element = getRandom(scenario.elements);
      const action = getRandom(scenario.actions);
      
      finalPrompt = `集体活动，${scenario.scene}场景，大家正在${action}，画面中有${element}，氛围${scenario.vibe}，插画风格，细节丰富`;
      break;
    }
  }

  return finalPrompt + QUALITY_SUFFIX;
}

// 保持接口兼容
export const IMAGE_PROMPTS: Record<ImageType, string[]> = {
  person: [], object: [], event: [], scenery: [] 
};

export function getRandomPrompt(type: ImageType): string {
  return generateRandomPrompt(type);
}

// ----------------------------------------------------------------------
// 评分系统 Prompt (保持不变)
// ----------------------------------------------------------------------
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
