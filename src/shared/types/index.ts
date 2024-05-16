export type TScalar = string | number | boolean;

/**
 * Types, specific to Local Storage
 */
export enum LSKey {
  AccessToken = "accessToken",
}

/**
 * GraphQL-related types
 */
export interface QueryOutput<T> {
  result: T;
}

export interface PaginationArgs {
  limit: number;
  offset: number;
}

export interface PaginatedType<T> {
  items: T[];
  count: number;
}
