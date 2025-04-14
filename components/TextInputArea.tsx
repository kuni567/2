'use client'

import { useState } from 'react'

interface TextInputAreaProps {
  value: string
  onChange: (text: string) => void
}

const TextInputArea: React.FC<TextInputAreaProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  // サンプルテキストを挿入する機能
  const insertSampleText = () => {
    const sampleText = "The quick brown fox jumps over the lazy dog. Learning a new language requires practice and patience. Technology can help us improve our skills faster."
    onChange(sampleText)
  }

  return (
    <div className="rounded-lg shadow-md bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">入力テキスト</h2>
        <button
          onClick={insertSampleText}
          className="px-3 py-1 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
        >
          サンプル挿入
        </button>
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="英文を入力または貼り付けてください..."
        className={`w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 transition-all ${
          isFocused ? 'focus:ring-primary border-primary' : 'border-gray-300'
        }`}
      />
    </div>
  )
}

export default TextInputArea 