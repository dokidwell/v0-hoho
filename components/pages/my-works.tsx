"use client"

import type { Work } from "@/lib/types"

interface MyWorksProps {
  works: Work[]
  onSelectWork: (id: string) => void
}

function StatusBadge({ status }: { status: Work["status"] }) {
  const styles = {
    generating: "bg-primary/10 text-primary",
    completed: "bg-success/10 text-success",
    failed: "bg-destructive/10 text-destructive",
  }
  const labels = {
    generating: "生成中",
    completed: "已完成",
    failed: "失败",
  }

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export function MyWorks({ works, onSelectWork }: MyWorksProps) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col px-5 pb-24 pt-6">
      <h1 className="pb-5 text-xl font-bold text-foreground">我的作品</h1>

      {works.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">还没有作品，快去创作吧</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {works.map((work) => (
            <button
              key={work.id}
              onClick={() => onSelectWork(work.id)}
              className="flex items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-muted"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <span className="text-xs text-muted-foreground">封面</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <p className="truncate text-sm font-medium text-foreground">{work.title}</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status={work.status} />
                  <span className="text-xs text-muted-foreground">{work.pages} 页</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
