"use client"

import { ChevronLeft } from "lucide-react"

interface AuthorProfileProps {
  authorId: string
  authorName: string
  onBack: () => void
}

const publishedWorks = [
  { id: "p1", title: "Hoho 的太空冒险" },
  { id: "p2", title: "森林里的小精灵" },
  { id: "p3", title: "巧克力雨的一天" },
]

export function AuthorProfile({ authorName, onBack }: AuthorProfileProps) {
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
        <h1 className="text-xl font-bold text-foreground">作者主页</h1>
      </header>

      {/* Author Info */}
      <div className="flex flex-col items-center gap-3 pb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <span className="text-2xl font-bold text-primary">
            {authorName.charAt(0)}
          </span>
        </div>
        <h2 className="text-lg font-bold text-foreground">{authorName}</h2>
      </div>

      {/* Published Works */}
      <div className="flex flex-col gap-1">
        <h3 className="pb-3 text-sm font-medium text-muted-foreground">
          公开作品
        </h3>
        <div className="flex flex-col gap-3">
          {publishedWorks.map((work) => (
            <div
              key={work.id}
              className="flex items-center gap-4 rounded-xl bg-card p-4"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <span className="text-xs text-muted-foreground">封面</span>
              </div>
              <p className="text-sm font-medium text-foreground">{work.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
