"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

const themes = [
  { id: "adventure", label: "冒险", icon: "🗺️" },
  { id: "friendship", label: "友情", icon: "🤝" },
  { id: "funny", label: "搞笑", icon: "😂" },
  { id: "healing", label: "治愈", icon: "🌿" },
  { id: "imagination", label: "脑洞", icon: "💡" },
  { id: "school", label: "校园", icon: "🏫" },
  { id: "animals", label: "动物", icon: "🐾" },
  { id: "space", label: "太空", icon: "🚀" },
  { id: "detective", label: "侦探", icon: "🔍" },
  { id: "invention", label: "发明", icon: "⚙️" },
]

interface ThemeSelectionProps {
  onSelect: (theme: string) => void
  onBack: () => void
}

export function ThemeSelection({ onSelect, onBack }: ThemeSelectionProps) {
  const [selected, setSelected] = useState<string | null>(null)

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
        <h1 className="text-xl font-bold text-foreground">选一个主题</h1>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelected(theme.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-5 transition-all ${
              selected === theme.id
                ? "border-primary bg-secondary"
                : "border-transparent bg-card hover:bg-muted"
            }`}
          >
            <span className="text-2xl" role="img" aria-hidden="true">
              {theme.icon}
            </span>
            <span
              className={`text-sm font-medium ${
                selected === theme.id ? "text-primary" : "text-foreground"
              }`}
            >
              {theme.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Button
          className="h-12 w-full rounded-xl text-base font-medium"
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
        >
          下一步
        </Button>
      </div>
    </div>
  )
}
