import { NextResponse } from 'next/server';

// APIキーの設定
const API_KEY = "66cf6725-b789-42f6-a417-178152a11208:fx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  if (!word) {
    return NextResponse.json(
      { error: 'Word parameter is required' },
      { status: 400 }
    );
  }

  try {
    // DeepL APIを呼び出し
    const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `DeepL-Auth-Key ${API_KEY}`
      },
      body: JSON.stringify({
        text: [word],
        target_lang: 'JA',
        source_lang: 'EN'
      })
    });

    if (!response.ok) {
      throw new Error('DeepL API request failed');
    }

    const data = await response.json();
    const translation = data.translations[0].text;

    // 翻訳結果を格納
    const translationData = {
      word: word,
      translation: translation,
      alternatives: [],
      partOfSpeech: detectPartOfSpeech(word),
      examples: generateExamples(word)
    };

    return NextResponse.json(translationData);
  } catch (error) {
    console.error('Translation error:', error);
    // エラー時はモックデータを返す
    return NextResponse.json(getMockTranslation(word));
  }
}

/**
 * 品詞を簡易判定する関数
 */
function detectPartOfSpeech(word: string): string {
  // 簡易的な判定
  const noun = /^[A-Z][a-z]*$/.test(word); // 先頭が大文字なら固有名詞と仮定
  const verb = /[a-z]+(s|ed|ing)$/.test(word); // 動詞の語尾パターン
  const adjective = /[a-z]+(ful|ous|ive|able|al)$/.test(word); // 形容詞の語尾パターン
  
  if (verb) return '動詞';
  if (adjective) return '形容詞';
  if (noun) return '名詞';
  return '不明';
}

/**
 * 例文を生成する関数
 */
function generateExamples(word: string): { en: string; ja: string }[] {
  return [
    { 
      en: `This is an example sentence with the word "${word}".`, 
      ja: `これは「${word}」という単語を使った例文です。` 
    },
    { 
      en: `Can you use "${word}" in a different context?`, 
      ja: `「${word}」を別の文脈で使えますか？` 
    }
  ];
}

/**
 * モックの翻訳データを生成する関数
 */
function getMockTranslation(word: string): any {
  const mockData: { [key: string]: any } = {
    'quick': {
      word: 'quick',
      translation: '素早い',
      alternatives: ['迅速な', '急速な', '短時間の'],
      partOfSpeech: '形容詞',
      examples: [
        { en: 'She gave me a quick smile.', ja: '彼女は私に素早く微笑んだ。' },
        { en: 'We need a quick solution.', ja: '迅速な解決策が必要です。' }
      ]
    },
    'brown': {
      word: 'brown',
      translation: '茶色の',
      alternatives: ['褐色の', '焦げ茶色の', 'ブラウンの'],
      partOfSpeech: '形容詞',
      examples: [
        { en: 'She has brown eyes.', ja: '彼女は茶色の目をしている。' },
        { en: 'The leaves turned brown in autumn.', ja: '葉は秋に茶色に変わった。' }
      ]
    }
  };
  
  // モックデータにない単語の場合はシンプルな翻訳データを生成
  if (!mockData[word.toLowerCase()]) {
    return {
      word: word,
      translation: `「${word}」の翻訳`,
      alternatives: ['代替訳1', '代替訳2', '代替訳3'],
      partOfSpeech: detectPartOfSpeech(word),
      examples: [
        { en: `This is an example with "${word}".`, ja: `これは「${word}」を使った例文です。` },
        { en: `Another sentence using "${word}".`, ja: `「${word}」を使った別の文です。` }
      ]
    };
  }
  
  return mockData[word.toLowerCase()];
} 