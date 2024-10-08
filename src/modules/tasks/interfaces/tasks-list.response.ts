export interface TasksListResponse {
  data: Datum[];
}

export interface Datum {
  type: DatumType;
  id: number;
  attributes: Attributes;
  relationships: DatumRelationships;
  includes: Includes;
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

export interface Includes {
  type: DataType;
  id: number;
  attributes: IncludesAttributes;
  relationships: IncludesRelationships;
  links: Links;
}

export interface IncludesAttributes {
  title: string;
  slug: string;
}

export interface Links {
  self: string;
}

export interface IncludesRelationships {
  user: Category;
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

export interface DatumRelationships {
  user: Category;
  category: Category;
}

export enum DatumType {
  Task = 'task',
}
