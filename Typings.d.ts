/**
 * Represents a type of T, null or undefined.
 */
export type Maybe<T> = T | null | undefined

/**
 * Ensures type of T, cannot be null or undefined.
 */
export type Ensure<T> = Exclude<T, null | undefined>
