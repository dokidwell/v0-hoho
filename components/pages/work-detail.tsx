"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Trash2 } from "lucide-react"
import type { Work } from "@/lib/types"

interface WorkDetailProps {
  work: Work
  onBack: () => void
  onDelete: (id: string) => void
  onSubmitReview: (id: string) => void
  onViewAuthor: (authorId: string) => void
}

function VisibilityBadge({ visibility }: { visibility: Work["visibility"] }) {
  const map = {
    private: { label: "私有", className: "bg-muted text-muted-foreground" },
    pending: { label: "待审核", className: "bg-primary/10 text-primary" },
    published: { label: "已发布", className: "bg-success/10 text-success" },
    rejected: { label: "未通过", className: "bg-destructive/10 text-destructive" },
  }
  const item = map[visibility]

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${item.className}`}>
      {item.label}
    </span>
  )
}

export function WorkDetail({ work, onBack, onDelete, onSubmitReview, onViewAuthor }: WorkDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
          aria-label="返回"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <VisibilityBadge visibility={work.visibility} />
      </header>

      {/* Cover */}
      <div className="mx-5 flex aspect-[4/3] items-center justify-center rounded-xl bg-secondary">
        <span className="text-sm text-muted-foreground">封面图片</span>
      </div>

      {/* Title */}
      <div className="px-5 pt-5">
        <h1 className="text-lg font-bold text-foreground">{work.title}</h1>
      </div>

      {/* Author */}
      <button
        onClick={() => onViewAuthor(work.authorId)}
        className="mx-5 mt-4 flex items-center gap-3 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <span className="text-xs font-medium text-primary">
            {work.authorName.charAt(0)}
          </span>
        </div>
        <span className="text-sm font-medium text-foreground">{work.authorName}</span>
      </button>

      {/* Story Pages */}
      <div className="mt-5 flex flex-col gap-4 px-5">
        {Array.from({ length: work.pages }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-secondary">
              <span className="text-xs text-muted-foreground">第 {i + 1} 页</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              这里是第 {i + 1} 页的故事文字…
            </p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 px-5">
        {work.visibility === "private" && (
          <Button
            className="h-12 w-full rounded-xl text-base font-medium"
            onClick={() => onSubmitReview(work.id)}
          >
            我要展示
          </Button>
        )}
        {work.visibility === "pending" && (
          <div className="rounded-xl bg-secondary p-4 text-center text-sm text-primary">
            作品正在准备展出
          </div>
        )}
        {work.visibility === "rejected" && (
          <div className="rounded-xl bg-destructive/5 p-4 text-center text-sm text-destructive">
            这本书暂时不能展出，但已保存在我的作品
          </div>
        )}

        {!showDeleteConfirm ? (
          <Button
            variant="ghost"
            className="h-11 w-full rounded-xl text-sm text-destructive hover:bg-destructive/5 hover:text-destructive"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            删除
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-11 flex-1 rounded-xl text-sm bg-transparent"
              onClick={() => setShowDeleteConfirm(false)}
            >
              取消
            </Button>
            <Button
              variant="destructive"
              className="h-11 flex-1 rounded-xl text-sm"
              onClick={() => onDelete(work.id)}
            >
              确认删除
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
