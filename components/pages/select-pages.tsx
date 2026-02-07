"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

const pageOptions = [
  { value: 1, label: "1 页", recommended: true },
  { value: 2, label: "2 页", recommended: false },
  { value: 3, label: "3 页", recommended: false },
  { value: 4, label: "4 页", recommended: true },
]

interface SelectPagesProps {
  onGenerate: (pages: number) => void
  onBack: () => void
}

export function SelectPages({ onGenerate, onBack }: SelectPagesProps) {
  const [selected, setSelected] = useState(1)

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col px-5 pb-24 pt-4">
      <header className="flex items-center gap-3 pb-6">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
          aria-label="返回"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">选择页数</h1>
      </header>

      <p className="pb-5 text-sm text-muted-foreground">
        选择你想要的故事长度
      </p>

      <div className="flex flex-col gap-3">
        {pageOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 transition-all ${
              selected === opt.value
                ? "border-primary bg-secondary"
                : "border-transparent bg-card"
            }`}
          >
            <span
              className={`text-base font-medium ${
                selected === opt.value ? "text-primary" : "text-foreground"
              }`}
            >
              {opt.label}
            </span>
            {opt.recommended && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                推荐
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <Button
          className="h-12 w-full rounded-xl text-base font-medium"
          onClick={() => onGenerate(selected)}
        >
          开始生成
        </Button>
      </div>
    </div>
  )
}
