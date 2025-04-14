'use client'

import React from 'react'

interface Example {
  en: string
  ja: string
}

interface TranslationData {
  word: string
  translation: string
  alternatives: string[]
  partOfSpeech: string
  examples: Example[]
}

interface DetailPanelProps {
  selectedWord: string | null
  translationData: TranslationData | null
  isLoading?: boolean
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  selectedWord,
  translationData,
  isLoading = false,
}) => {
  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="rounded-lg shadow-md bg-white p-4 h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">詳細情報</h2>
        <div className="flex items-center justify-center h-[350px] text-gray-500">
          <p>翻訳データを取得中...</p>
        </div>
      </div>
    )
  }

  if (!selectedWord || !translationData) {
    return (
      <div className="rounded-lg shadow-md bg-white p-4 h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">詳細情報</h2>
        <div className="flex items-center justify-center h-[350px] text-gray-500">
          <p>単語を選択すると翻訳と詳細が表示されます</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg shadow-md bg-white p-4 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">詳細情報</h2>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary mb-1">{translationData.word}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="bg-gray-200 px-2 py-0.5 rounded">{translationData.partOfSpeech}</span>
        </div>
        <p className="text-lg">{translationData.translation}</p>
      </div>

      {translationData.alternatives.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">代替訳</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {translationData.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      )}

      {translationData.examples.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-1">例文</h4>
          <div className="space-y-3">
            {translationData.examples.map((example, index) => (
              <div key={index} className="border-l-2 border-primary pl-3">
                <p className="text-gray-800">{example.en}</p>
                <p className="text-gray-600">{example.ja}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailPanel 