import type { Status } from '@/modules/tasks/interfaces/tasks-list.response'

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  category?: string
}

export interface Form {
  title: string;
  description: string;
  status: Status;
  category: number | null;
}