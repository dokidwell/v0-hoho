import React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_SC } from "next/font/google"
import "./globals.css"

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-sc",
})

export const metadata: Metadata = {
  title: "Hoho 创作",
  description: "和 Hoho 一起创作有趣的故事",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2F80ED",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
