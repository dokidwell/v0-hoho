"use client"

import { useState } from "react"
import { Heart, Bookmark } from "lucide-react"

interface RiverWork {
  id: string
  title: string
  likes: number
  bookmarked: boolean
}

const initialRiverWorks: RiverWork[] = [
  { id: "r1", title: "Hoho 的太空冒险", likes: 12, bookmarked: false },
  { id: "r2", title: "森林里的小精灵", likes: 8, bookmarked: false },
  { id: "r3", title: "巧克力雨的一天", likes: 23, bookmarked: false },
  { id: "r4", title: "会飞的书本", likes: 5, bookmarked: false },
  { id: "r5", title: "机器人迷路记", likes: 17, bookmarked: false },
  { id: "r6", title: "糖果王国大冒险", likes: 31, bookmarked: false },
]

interface RiverPageProps {
  onSelectWork: (id: string) => void
}

export function RiverPage({ onSelectWork }: RiverPageProps) {
  const [works, setWorks] = useState(initialRiverWorks)
  const [likesGiven, setLikesGiven] = useState(0)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const maxDailyLikes = 5

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return
    if (likesGiven >= maxDailyLikes) return

    setLikedIds((prev) => new Set(prev).add(id))
    setLikesGiven((c) => c + 1)
    setWorks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    )
  }

  const handleBookmark = (id: string) => {
    setWorks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, bookmarked: !w.bookmarked } : w))
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col px-5 pb-24 pt-6">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-xl font-bold text-foreground">河道</h1>
        <span className="text-xs text-muted-foreground">
          今日小心心 {likesGiven}/{maxDailyLikes}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {works.map((work) => (
          <div
            key={work.id}
            className="flex flex-col overflow-hidden rounded-xl bg-card"
          >
            <button
              onClick={() => onSelectWork(work.id)}
              className="flex aspect-square items-center justify-center bg-secondary"
            >
              <span className="text-xs text-muted-foreground">封面</span>
            </button>
            <div className="flex flex-col gap-2 p-3">
              <p className="line-clamp-1 text-sm font-medium text-foreground">
                {work.title}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLike(work.id)}
                  disabled={likesGiven >= maxDailyLikes && !likedIds.has(work.id)}
                  className="flex items-center gap-1 text-xs transition-colors"
                  aria-label={`点赞 ${work.title}`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedIds.has(work.id)
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span className={likedIds.has(work.id) ? "text-destructive" : "text-muted-foreground"}>
                    {work.likes}
                  </span>
                </button>
                <button
                  onClick={() => handleBookmark(work.id)}
                  className="flex items-center text-xs transition-colors"
                  aria-label={`收藏 ${work.title}`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      work.bookmarked
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
