"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown } from "lucide-react"

const whereOptions = ["神秘森林", "深海城堡", "外太空", "魔法学校", "糖果王国", "恐龙岛"]
const whoOptions = ["一只会说话的猫", "一个迷路的机器人", "一位魔法师", "一颗流星", "一群小精灵", "一本会飞的书"]
const whatOptions = [
  "它们决定一起冒险",
  "发现了一个神秘宝箱",
  "天空突然变成了彩虹色",
  "大家开始了一场比赛",
  "突然下起了巧克力雨",
  "所有东西都变小了",
]

interface DropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex h-12 w-full items-center justify-between rounded-xl border bg-card px-4 text-left transition-colors ${
            open ? "border-primary" : "border-border"
          }`}
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value || "请选择..."}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-xl border border-border bg-card py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`flex w-full px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
                  value === opt ? "font-medium text-primary" : "text-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface FillInBlanksProps {
  onNext: (answers: { where: string; who: string; what: string }) => void
  onBack: () => void
}

export function FillInBlanks({ onNext, onBack }: FillInBlanksProps) {
  const [where, setWhere] = useState("")
  const [who, setWho] = useState("")
  const [what, setWhat] = useState("")

  const allFilled = where && who && what

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
        <h1 className="text-xl font-bold text-foreground">把故事填一填</h1>
      </header>

      <div className="flex flex-col gap-5">
        <Dropdown label="Hoho 在哪里" options={whereOptions} value={where} onChange={setWhere} />
        <Dropdown label="Hoho 遇到了什么" options={whoOptions} value={who} onChange={setWho} />
        <Dropdown label="发生了什么事" options={whatOptions} value={what} onChange={setWhat} />
      </div>

      <div className="mt-auto pt-8">
        <Button
          className="h-12 w-full rounded-xl text-base font-medium"
          disabled={!allFilled}
          onClick={() => onNext({ where, who, what })}
        >
          下一步
        </Button>
      </div>
    </div>
  )
}
