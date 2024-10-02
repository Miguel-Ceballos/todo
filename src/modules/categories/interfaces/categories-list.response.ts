export interface CategoriesListResponse {
  data: Datum[];
}

export interface Datum {
  type: string;
  id: number;
  attributes: Attributes;
  relationships: Relationships;
  links: Links;
}

export interface Attributes {
  title: string;
  slug: string;
}

export interface Links {
  self: string;
}

export interface Relationships {
  user: User;
}

export interface User {
  data: Data;
}

export interface Data {
  type: string;
  id: number;
}

export interface ResponseError {
  ok: boolean;
  message: string;
}

export interface SuccessPostCategoryResponse {
  data: Datum;
}

export interface AxiosCategoryErrors {
  data: PostCategoryErrorResponse;
}

export interface PostCategoryErrorResponse {
    errors: Error[];
}

export interface Error {
  status:  number;
  message: string;
  source:  string;
}

export interface DeletedResponse {
  data:    any[];
  message: string;
  status:  number;
}


