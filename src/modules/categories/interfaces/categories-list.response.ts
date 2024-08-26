export interface Attributes {
  title: string;
  slug: string;
}

export interface Data {
  type: string;
  id: number;
}

export interface User {
  data: Data;
}

export interface Relationships {
  user: User;
}

export interface Links {
  self: string;
}

export interface Data {
  type: string;
  id: number;
  attributes: Attributes;
  relationships: Relationships;
  links: Links;
}

export interface CategoriesListResponse {
  data: Data[];
}