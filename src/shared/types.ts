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
export interface MutationOutput<T> {
  result: T;
}
