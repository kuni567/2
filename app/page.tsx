'use client'

import { useState } from 'react'
import TranslatePanel from '../components/TranslatePanel'
import TextInputArea from '../components/TextInputArea'
import DetailPanel from '../components/DetailPanel'
import { translateWord } from '../lib/translate'

export default function Home() {
  const [inputText, setInputText] = useState<string>('')
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [translationData, setTranslationData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 単語が選択された時の処理
  const handleWordSelect = async (word: string) => {
    setSelectedWord(word)
    setIsLoading(true)
    
    try {
      // DeepL APIを使用して翻訳を取得
      const data = await translateWord(word)
      setTranslationData(data)
    } catch (error) {
      console.error('Failed to translate word:', error)
      // エラー時はシンプルなデータを表示
      setTranslationData({
        word: word,
        translation: `「${word}」(翻訳に失敗しました)`,
        alternatives: [],
        partOfSpeech: '',
        examples: []
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto p-4 md:p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">TouchTranslate</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <TextInputArea 
            value={inputText} 
            onChange={setInputText}
          />
          
          <TranslatePanel 
            text={inputText}
            selectedWord={selectedWord}
            onWordSelect={handleWordSelect}
          />
        </div>
        
        <DetailPanel 
          selectedWord={selectedWord}
          translationData={translationData}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
} 