/**
 * All valid token types for the lexer.
 */
export enum SourceTokenType {
    Equals = 'EQUALS',
    Space = 'SPACE',
    String = 'STRING',
    Word = 'WORD'
}

/**
 * Represents a composed token by the lexer.
 */
export type SourceToken = {
    content: string
    index: number
    type: SourceTokenType
}

/**
 * This class is responsible for generating manipulable tokens from source code.
 */
export class Lexer {
    /**
     * Compose and return an array of `SourceToken`s representing the given input string.
     * @param code - Source code to be composed.
     * @returns {SourceToken[]} - Array of composed tokens.
     */
    public tokenize(code: string) {
        code = this.#fix(code)
        const composition: SourceToken[] = []
        let insideString = false
        code.split('').forEach((char, index) => {
            // String handling
            if (this.#isString(char) && !insideString) {
                insideString = true
            } else if (this.#isString(char) && insideString) {
                insideString = false
                composition.push({
                    content: char,
                    type: SourceTokenType.String,
                    index
                })
            }

            // Character handling
            if (this.#isWord(char) && !insideString) {
                composition.push({
                    content: char,
                    type: SourceTokenType.Word,
                    index
                })
            } else if (insideString) {
                composition.push({
                    content: char,
                    type: SourceTokenType.String,
                    index
                })
            } else if (char === ' ') {
                composition.push({
                    content: char,
                    type: SourceTokenType.Space,
                    index
                })
            } else if (char === '=') {
                composition.push({
                    content: char,
                    type: SourceTokenType.Equals,
                    index
                })
            }
        })
        return composition
    }

    /**
     * @private Fix the given code.
     * @param code - Code to be fixed.
     * @returns {string}
     */
    #fix = (code: string) => code.split('\n').map(_ => _.trim()).join('\n')

    /**
     * Check if the given character is word.
     * @param char - Character to be tested.
     * @returns {boolean}
     */
    #isWord = (char: string) => /\w/.test(char)

    /**
     * Check if the given character opens/closes a string.
     * @param char - Character to be tested.
     * @returns {boolean}
     */
    #isString = (char: string) => ['"', "'"].includes(char)
}
