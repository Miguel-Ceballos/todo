export interface Category {
  id: number;
  title: string;
  slug: string;
}

export interface CategoryError {
  status: number;
  message: string;
  source: string;
}