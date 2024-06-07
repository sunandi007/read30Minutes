export interface BookRecomend {
  content_items: ContentBook[];
}

export interface ContentBook {
  id: string;
  kind: string;
  slug: string;
  title: string;
  author: Author;
  subtitle: string;
  url: string;
  browseUrl: string;
  readUrl: string;
  readingDuration: number;
  averageRating: number;
  totalRatings: number;
  images: Image[];
  categories: ConectionCategory[];
  publishedAt: string;
}

export interface Image {
  bookId: string;
  id: string;
  large: string;
  medium: string;
  original: string;
  small: string;
  updatedAt: string;
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
}

export interface ConectionCategory {
  category: Categories
}

export interface Categories {
  id:   String
  name: String
  slug: String
}