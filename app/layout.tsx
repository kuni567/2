import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TouchTranslate - 対話型翻訳学習ツール',
  description: '英文を入力して単語をタッチすると翻訳と詳細情報が表示されます',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 