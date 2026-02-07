"use client"

import { HohoLogo } from "@/components/hoho-logo"
import { Button } from "@/components/ui/button"

interface HomePageProps {
  onStartCreate: () => void
}

export function HomePage({ onStartCreate }: HomePageProps) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-8">
      <div className="flex flex-col items-center gap-8">
        <HohoLogo size={80} />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Hoho 创作
          </h1>
          <p className="text-sm text-muted-foreground">
            和 Hoho 一起，创作属于你的故事
          </p>
        </div>
        <Button
          size="lg"
          className="mt-4 h-12 w-full max-w-[240px] rounded-xl text-base font-medium"
          onClick={onStartCreate}
        >
          开始创作
        </Button>
      </div>
    </div>
  )
}
