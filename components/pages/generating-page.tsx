"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HohoLogo } from "@/components/hoho-logo"

interface GeneratingPageProps {
  totalPages: number
  onGoToWorks: () => void
  onComplete: (workId: string) => void
}

export function GeneratingPage({ totalPages, onGoToWorks, onComplete }: GeneratingPageProps) {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    if (completed >= totalPages) {
      const timer = setTimeout(() => {
        onComplete(`work-${Date.now()}`)
      }, 800)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(
      () => setCompleted((c) => c + 1),
      1500 + Math.random() * 1000
    )
    return () => clearTimeout(timer)
  }, [completed, totalPages, onComplete])

  const progress = totalPages > 0 ? (completed / totalPages) * 100 : 0

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-8">
      <div className="flex w-full max-w-xs flex-col items-center gap-8">
        <div className="animate-pulse">
          <HohoLogo size={72} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">Hoho 正在创作…</h1>
          <p className="text-sm text-muted-foreground">
            已完成 {completed}/{totalPages}
          </p>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex w-full flex-col gap-3 pt-4">
          <Button
            variant="outline"
            className="h-11 w-full rounded-xl text-sm bg-transparent"
            disabled
          >
            继续等待
          </Button>
          <Button
            variant="ghost"
            className="h-11 w-full rounded-xl text-sm text-muted-foreground"
            onClick={onGoToWorks}
          >
            返回我的作品
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            返回不影响后台生成
          </p>
        </div>
      </div>
    </div>
  )
}
