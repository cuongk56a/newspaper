export enum STATUS_TYPE {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  PENDING = "PENDING",
}

export interface PostModel {
  id: string
  title: string
  slug: string
  thumbnail: string
  category: any
  source: Source
  likes: number
  summary: string
  author: string
  publish_date: string
  status: string
  contents: Content[]
  keywords: Keyword[]
  views: number
  user: any
  description: any
}

export interface Source {
  id: string
  title: string
  domain: string
}

export interface Content {
  id: string
  title: string
  paragraph: Paragraph[]
  image: string
  description_img: string
  index: number
}

export interface Paragraph {
  text: string
  below_img: boolean
}

export interface Keyword {
  id: string
  keyword: string
}
