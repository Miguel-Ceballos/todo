export interface TasksListResponse {
  data: Datum[];
}

export interface Datum {
  type: DatumType;
  id: number;
  attributes: Attributes;
  relationships: Relationships;
  links: Links;
}

export interface Attributes {
  title: string;
  description: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export enum Status {
  C = 'C',
  D = 'D',
  P = 'P',
}

export interface Links {
  self: string;
}

export interface Relationships {
  user: Category;
  category: Category;
}

export interface Category {
  data: Data;
}

export interface Data {
  type: DataType;
  id: number;
}

export enum DataType {
  Category = 'category',
  User = 'user',
}

export enum DatumType {
  Task = 'task',
}
