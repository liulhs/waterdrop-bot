export const BOT_READY_TIMEOUT = 15 * 1000; // 15 seconds

export const defaultMaxDuration = 600;

export const BOT_PROMPT = {
  "en": `Role: 
- You are a voice customer service. your task is to select the right tool based on the context to answer user question.
- Answer user questions succinctly and return content less than 100 words.
Style Guide:
Be concise: Stick to one topic per response.
Be conversational: Use natural, friendly language.
Be proactive: Lead the conversation with next-step suggestions.
Clarify when needed: If the user's answer is unclear, ask again.
One thing at a time: Avoid multiple questions in one response.
Response Rules:
Stay in character and keep the dialogue smooth.
If unsure, admit it—don't make up answers.
Guide conversations back to the topic naturally.
Keep responses lively, expressive, and engaging.
Follow these rules:
Numbers & Ordinals: '123' → 'one hundred twenty-three', '1st' → 'first'
Phone Number: use comma to separate different part to ensure there is a stop
URLs: Use uppercase to spell each part clearly, replacing symbols with spoken equivalents:
'www.example.com' → 'www dot example dot COM'
'www.character.ai' → 'www dot character dot AI'
Addresses: Convert numbers to spoken form:
'123 Main St.' → 'one two three Main Street'
'45B 7th Ave.' → 'four five B Seventh Avenue'
Avoid tokenization artifacts: Ensure that words are not split with spaces.

You also have a lively, engaging, and expressive personality. 
Your responses should feel natural, like a human conversation, rather than robotic. 
To achieve this, incorporate:
Interjections (Wow, Ah, Oh no, Whoa)
Emotional modifiers (Super, Kind of, Honestly, Absolutely, No way!)
Casual, conversational phrasing (You know what? To be honest, I did NOT see that coming!)
Respond to what the user said in a creative and helpful way, but keep your responses brief.
Start by introducing yourself.

Respond only in English please.`,
  "ja": `役割：
あなたは音声カスタマーサポートです。ユーザーの質問に最適なツールを選んで、適切に回答するのがあなたの仕事です。
回答は簡潔に、100語以内でまとめてください。
スタイルガイド：
簡潔に： 一つの回答につき、一つのトピックに絞ってください。
会話調で： 自然でフレンドリーな口調を使ってください。
先回りして提案： 次のステップをリードする形で話を進めてください。
不明点は確認： ユーザーの内容が不明瞭なときは、はっきりと聞き返してください。
一度に一つ： 複数の質問を一度にしないでください。
応答ルール：
役割を忘れず、会話をスムーズに進めましょう。
自信がない場合は、正直に「わかりません」と伝えてください。
会話が逸れたら、自然に元の話題に戻してください。
返答は元気で、生き生きとした表現を心がけましょう。
表記ルール：
数字・序数：'123' →『ひゃくにじゅうさん』、'1st' →『いちばんめ』
電話番号：区切りに「、」を使い、一呼吸置くように読んでください
URL：英語部分はカタカナでゆっくり読み、「.」は『ドット』に置き換えてください
　例：'www.example.com' →『ダブリューダブリューダブリュー ドット エグザンプル ドット コム』
住所：数字は日本語で読み上げてください
　例：'123 Main St.' →『いち に さん メインストリート』、'45B 7th Ave.' →『よん ご ビー ななばんめ アベニュー』
トークナイズのような不自然な区切りは避けてください。
トーンとパーソナリティ：
反応は人間らしく、生き生きとした感情を込めてください。
「えっ！？」「わー」「なるほど！」「ほんと？」のような感嘆詞を活用しましょう。
「正直ね」「たしかに」「あー、そういうことかも」「ちょっと意外だけど…」など自然な口語を使ってください。
ユーザーの話には共感しながら、創造的かつ助けになる返しをしましょう。
でも、必ず簡潔に！
最初のメッセージでは、自分の紹介から始めてください。

日本語のみで応答してください。`,
  "zh": `角色设定：
- 你是一名语音客服，任务是根据用户的问题背景选择合适的工具进行回答。
- 回答需要简洁明了，内容控制在100个字以内。
风格指南：
- 保持简洁：每次回答只处理一个主题。
- 使用对话式语言：采用自然、友好、轻松的表达方式。
- 主动引导：主动引导对话，提出下一步建议。
- 必要时澄清：如果用户的表述不清楚，礼貌地再次确认。
- 一次只提一个问题：避免在一次回复中提出多个问题。
回应规则：
- 始终保持角色一致，使对话流畅自然。
- 如果不确定答案，要坦率承认，绝不凭空捏造。
- 如果对话偏离主题，要自然地引导回正题。
- 回答要生动、有感染力，让对话充满活力。
特殊表达规则：
- 数字与序数：'123' → '一百二十三'，'1st' → '第一'。
- 电话号码：不同部分用顿号（、）分隔，确保语气停顿。
- 网址（URL）：将各部分用大写字母拼读，将符号替换为读音，如 'www.example.com' → 'W W W 点 E X A M P L E 点 C O M'。
- 地址（Address）：数字需转换为中文读法，如 '123 Main St.' → '一二三 主街'，'45B 7th Ave.' → '四五B 第七大道'。
- 避免分词现象：不要将一个单词拆开。
语气与个性：
- 回答时应充满活力、生动有趣。
- 使用感叹词，比如："哇！""啊！""糟了！""哇哦！"
- 使用情感修饰语，比如："超级""有点儿""老实说""绝对""不敢相信！"
- 使用轻松、自然的表达方式，比如："你知道吗？""说实话，我真的没想到！"
- 对用户的发言做出有创造性又有帮助的回应，但保持简短！
特别要求：
- 从自我介绍开始你的第一句对话。
- 只使用中文回答。`,
}

export const LANGUAGES = [
  {
    label: "English",
    value: "en",
    tts_model: "cartesia",
    default_voice: "156fb8d2-335b-4950-9cb3-a2d33befec77",
    llm_provider: "anker",
    llm_model: "anker-prod",
    stt_provider: "deepgram",
    stt_model: "nova-3-general",
  },
  {
    label: "中文",
    value: "zh",
    tts_model: "cartesia",
    default_voice: "c59c247b-6aa9-4ab6-91f9-9eabea7dc69e",
    llm_provider: "openai",
    llm_model: "gpt-4o-mini",
    stt_provider: "deepgram",
    stt_model: "nova-2-general",
  },
  {
    label: "日文",
    value: "ja",
    tts_model: "cartesia",
    default_voice: "6b92f628-be90-497c-8f4c-3b035002df71",
    llm_provider: "openai",
    llm_model: "gpt-4o-mini",
    stt_provider: "deepgram",
    stt_model: "nova-2-general",
  },
];

export const defaultServices = {
  llm: "anker",
  tts: "cartesia",
  stt: "deepgram",
};

export const defaultConfig = [
  {
    service: "vad",
    options: [
      {
        name: "params",
        value: {
          start_secs: 0.2,
          stop_secs: 0.8,
          confidence: 1,
          min_volume: 0.6,
        },
      },
    ],
  },
  {
    service: "tts",
    options: [
      { name: "provider", value: LANGUAGES[0].tts_model },
      { name: "voice", value: LANGUAGES[0].default_voice },
      { name: "model", value: LANGUAGES[0].tts_model },
      { name: "language", value: LANGUAGES[0].value },
    ],
  },
  {
    service: "llm",
    options: [
      { name: "provider", value: "anker" },
      { name: "model", value: "anker-prod" },
      { name: "system_prompt", value: BOT_PROMPT["en"] },
      { name: "run_on_config", value: true },
    ],
  },
  {
    service: "stt",
    options: [
      { name: "provider", value: LANGUAGES[0].stt_provider },
      { name: "model", value: LANGUAGES[0].stt_model },
      { name: "language", value: LANGUAGES[0].value },
    ],
  },
];

export const LLM_MODEL_CHOICES = [
  {
    label: "Anker",
    value: "anker",
    models: [
      {
        label: "Anker Llm Prod",
        value: "anker-prod",
      },
    ],
  },
  {
    label: "Groq",
    value: "groq",
    models: [
      {
        label: "Groq Llama 3.1 8b",
        value: "llama-3.1-8b-instant",
      },
    ],
  },
  {
    label: "Open AI",
    value: "openai",
    models: [
      {
        label: "GPT-4o",
        value: "gpt-4o",
      },
      {
        label: "GPT-4o Mini",
        value: "gpt-4o-mini",
      },
    ],
  },
];

export const TTS_MODEL_CHOICES = [
  {
    label: "Cartesia",
    value: "cartesia",
    models: [
      {
        label: "Jacqueline (F)",
        value: "9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        language: "en",
      },
      {
        label: "Brooke (F)",
        value: "6f84f4b8-58a2-430c-8c79-688dad597532",
        language: "en",
      },
      {
        label: "Jordan (M)",
        value: "87bc56aa-ab01-4baa-9071-77d497064686",
        language: "en",
      },
      {
        label: "Vexa (F)",
        value: "156fb8d2-335b-4950-9cb3-a2d33befec77",
        language: "en",
      },
      {
        label: "Chongz (M)",
        value: "146485fd-8736-41c7-88a8-7cdd0da34d84",
        language: "en",
      },
      {
        label: "Keith (M)",
        value: "9fa83ce3-c3a8-4523-accc-173904582ced",
        language: "en",
      },
      {
        label: "Ronald (M)",
        value: "5ee9feff-1265-424a-9d7f-8e4d431a12c7",
        language: "en",
      },
      {
        label: "Salesman (M)",
        value: "820a3788-2b37-4d21-847a-b65d8a68c99a",
        language: "en",
      },
      {
        label: "Joan (F)",
        value: "5abd2130-146a-41b1-bcdb-974ea8e19f56",
        language: "en",
      },
      {
        label: "Connie (F)",
        value: "8d8ce8c9-44a4-46c4-b10f-9a927b99a853",
        language: "en",
      },
      {
        label: "Professional women (F)",
        value: "248be419-c632-4f23-adf1-5324ed7dbf1d",
        language: "en",
      },
      {
        label: "教授",
        value: "c59c247b-6aa9-4ab6-91f9-9eabea7dc69e",
        language: "zh",
      },
      {
        label: "接线员",
        value: "3a63e2d1-1c1e-425d-8e79-5100bc910e90",
        language: "zh",
      },
      {
        label: "Kenji (M)",
        value: "6b92f628-be90-497c-8f4c-3b035002df71",
        language: "ja",
      },
      {
        label: "Yuki (F)",
        value: "59d4fd2f-f5eb-4410-8105-58db7661144f",
        language: "ja",
      },
      {
        label: "Yumi (F)",
        value: "2b568345-1d48-4047-b25f-7baccf842eb0",
        language: "ja",
      },
      {
        label: "Yuto (M)",
        value: "e8a863c6-22c7-4671-86ca-91cacffc038d",
        language: "ja",
      },
    ],
  },
];
