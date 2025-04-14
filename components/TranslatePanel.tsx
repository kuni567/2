'use client'

import React, { useEffect, useState } from 'react'

interface TranslatePanelProps {
  text: string
  selectedWord: string | null
  onWordSelect: (word: string) => void
}

const TranslatePanel: React.FC<TranslatePanelProps> = ({
  text,
  selectedWord,
  onWordSelect,
}) => {
  const [words, setWords] = useState<string[]>([])

  // テキストが変更されたら単語に分解
  useEffect(() => {
    if (!text) {
      setWords([])
      return
    }

    // 簡易的な単語分割（実際はもっと精度の高い分割が必要）
    const wordsArray = text
      .replace(/[.,!?;:()]/g, ' $& ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(word => word.length > 0)
    
    setWords(wordsArray)
  }, [text])

  // 単語がクリックされたときの処理
  const handleWordClick = (word: string) => {
    // 記号だけの場合は処理しない
    if (/^[.,!?;:()]+$/.test(word)) return
    
    // 記号を除去して純粋な単語を取得
    const cleanWord = word.replace(/[.,!?;:()]/g, '')
    onWordSelect(cleanWord)
  }

  return (
    <div className="rounded-lg shadow-md bg-white p-4 min-h-[200px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">テキスト表示</h2>
      
      {words.length > 0 ? (
        <div className="leading-relaxed">
          {words.map((word, index) => {
            // 記号だけなら特別扱い
            const isPunctuation = /^[.,!?;:()]+$/.test(word)
            // 記号を除去した単語が現在選択中の単語と一致するか
            const isSelected = !isPunctuation && word.replace(/[.,!?;:()]/g, '') === selectedWord
            
            return (
              <span
                key={index}
                onClick={() => !isPunctuation && handleWordClick(word)}
                className={`${
                  isPunctuation 
                    ? 'mr-0' 
                    : isSelected
                      ? 'selected-word mr-1'
                      : 'highlighted-word mr-1'
                }`}
              >
                {word}
              </span>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">テキストが入力されていません</p>
      )}
    </div>
  )
}

export default TranslatePanel 