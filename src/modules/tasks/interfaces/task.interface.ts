import type { Status } from '@/modules/tasks/interfaces/tasks-list.response'

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: Status;
  category: Category;
}

export interface CategoryTask {
  id?: number;
  title: string;
  description: string;
  status: Status;
}

export interface Category {
  id: number;
  title: string;
}