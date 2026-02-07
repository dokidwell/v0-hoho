"use client"

import { useState, useCallback } from "react"
import { TabBar } from "@/components/tab-bar"
import { HomePage } from "@/components/pages/home-page"
import { ThemeSelection } from "@/components/pages/theme-selection"
import { FillInBlanks } from "@/components/pages/fill-in-blanks"
import { SelectPages } from "@/components/pages/select-pages"
import { GeneratingPage } from "@/components/pages/generating-page"
import { MyWorks } from "@/components/pages/my-works"
import { WorkDetail } from "@/components/pages/work-detail"
import { RiverPage } from "@/components/pages/river-page"
import { AuthorProfile } from "@/components/pages/author-profile"
import type { Work } from "@/lib/types"

type Screen =
  | { type: "home" }
  | { type: "theme" }
  | { type: "fillin"; theme: string }
  | { type: "selectpages"; theme: string; answers: { where: string; who: string; what: string } }
  | { type: "generating"; theme: string; answers: { where: string; who: string; what: string }; pages: number }
  | { type: "works" }
  | { type: "workdetail"; workId: string }
  | { type: "river" }
  | { type: "author"; authorId: string; authorName: string }

const themeLabels: Record<string, string> = {
  adventure: "冒险",
  friendship: "友情",
  funny: "搞笑",
  healing: "治愈",
  imagination: "脑洞",
  school: "校园",
  animals: "动物",
  space: "太空",
  detective: "侦探",
  invention: "发明",
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>({ type: "home" })
  const [activeTab, setActiveTab] = useState("create")
  const [works, setWorks] = useState<Work[]>([
    {
      id: "demo-1",
      title: "Hoho 在太空的冒险",
      theme: "space",
      pages: 3,
      status: "completed",
      visibility: "published",
      authorId: "user-1",
      authorName: "小明",
      createdAt: Date.now() - 86400000,
      likes: 12,
    },
    {
      id: "demo-2",
      title: "森林里的友谊",
      theme: "friendship",
      pages: 2,
      status: "completed",
      visibility: "private",
      authorId: "user-1",
      authorName: "小明",
      createdAt: Date.now() - 43200000,
      likes: 0,
    },
  ])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "create") setScreen({ type: "home" })
    else if (tab === "works") setScreen({ type: "works" })
    else if (tab === "river") setScreen({ type: "river" })
  }

  const handleGenerationComplete = useCallback(
    (workId: string) => {
      if (screen.type !== "generating") return
      const newWork: Work = {
        id: workId,
        title: `Hoho 的${themeLabels[screen.theme] || ""}故事`,
        theme: screen.theme,
        pages: screen.pages,
        status: "completed",
        visibility: "private",
        authorId: "user-1",
        authorName: "小明",
        createdAt: Date.now(),
        likes: 0,
      }
      setWorks((prev) => [newWork, ...prev])
      setScreen({ type: "workdetail", workId })
      setActiveTab("works")
    },
    [screen]
  )

  const handleStartGeneration = (
    theme: string,
    answers: { where: string; who: string; what: string },
    pages: number
  ) => {
    // Create a generating entry immediately
    const tempId = `gen-${Date.now()}`
    const newWork: Work = {
      id: tempId,
      title: `Hoho 的${themeLabels[theme] || ""}故事`,
      theme,
      pages,
      status: "generating",
      visibility: "private",
      authorId: "user-1",
      authorName: "小明",
      createdAt: Date.now(),
      likes: 0,
    }
    setWorks((prev) => [newWork, ...prev])
    setScreen({ type: "generating", theme, answers, pages })
  }

  const handleDeleteWork = (id: string) => {
    setWorks((prev) => prev.filter((w) => w.id !== id))
    setScreen({ type: "works" })
  }

  const handleSubmitReview = (id: string) => {
    setWorks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visibility: "pending" as const } : w))
    )
  }

  const currentWork = screen.type === "workdetail"
    ? works.find((w) => w.id === screen.workId)
    : null

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background">
      <main>
        {screen.type === "home" && (
          <HomePage onStartCreate={() => setScreen({ type: "theme" })} />
        )}

        {screen.type === "theme" && (
          <ThemeSelection
            onSelect={(theme) => setScreen({ type: "fillin", theme })}
            onBack={() => setScreen({ type: "home" })}
          />
        )}

        {screen.type === "fillin" && (
          <FillInBlanks
            onNext={(answers) =>
              setScreen({ type: "selectpages", theme: screen.theme, answers })
            }
            onBack={() => setScreen({ type: "theme" })}
          />
        )}

        {screen.type === "selectpages" && (
          <SelectPages
            onGenerate={(pages) =>
              handleStartGeneration(screen.theme, screen.answers, pages)
            }
            onBack={() =>
              setScreen({ type: "fillin", theme: screen.theme })
            }
          />
        )}

        {screen.type === "generating" && (
          <GeneratingPage
            totalPages={screen.pages}
            onGoToWorks={() => {
              setActiveTab("works")
              setScreen({ type: "works" })
            }}
            onComplete={handleGenerationComplete}
          />
        )}

        {screen.type === "works" && (
          <MyWorks
            works={works}
            onSelectWork={(id) => setScreen({ type: "workdetail", workId: id })}
          />
        )}

        {screen.type === "workdetail" && currentWork && (
          <WorkDetail
            work={currentWork}
            onBack={() => {
              setActiveTab("works")
              setScreen({ type: "works" })
            }}
            onDelete={handleDeleteWork}
            onSubmitReview={handleSubmitReview}
            onViewAuthor={(authorId) =>
              setScreen({
                type: "author",
                authorId,
                authorName: currentWork.authorName,
              })
            }
          />
        )}

        {screen.type === "river" && (
          <RiverPage
            onSelectWork={(id) => setScreen({ type: "workdetail", workId: id })}
          />
        )}

        {screen.type === "author" && (
          <AuthorProfile
            authorId={screen.authorId}
            authorName={screen.authorName}
            onBack={() => {
              setActiveTab("works")
              setScreen({ type: "works" })
            }}
          />
        )}
      </main>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
