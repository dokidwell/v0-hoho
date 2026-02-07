export interface Work {
  id: string
  title: string
  theme: string
  pages: number
  status: "generating" | "completed" | "failed"
  visibility: "private" | "pending" | "published" | "rejected"
  authorId: string
  authorName: string
  createdAt: number
  likes: number
}

export interface RiverWork {
  id: string
  title: string
  pages: number
  likes: number
  bookmarked: boolean
}
