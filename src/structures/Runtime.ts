import { Maybe } from '@types'

/**
 * Represents a variable type.
 */
enum VariableType {
    Boolean,
    String,
    Number
}

/**
 * Represents a runtime variable
 */
interface IVariableDeclaration {
    name: string
    value: string
    type: VariableType
}

/**
 * This class is responsible for saving code cache.
 */
export class Runtime {
    /** Cached variables in this runtime. */
    #variables: IVariableDeclaration[] = []

    /**
     * Adds a variable to this runtime.
     * @param name - Variable name.
     * @param value - Variable value.
     * @param type - Variable type.
     * @returns {Runtime}
     */
    public addVariable(name: string, value: string, type: VariableType) {
        this.#variables.push({ name, value, type })
        return this
    }

    /**
     * Updates a variable in this runtime.
     * @param name - Variable name.
     * @param value - Variable value.
     * @param type - Variable type.
     * @returns {Runtime}
     */
    public updateVariable(name: string, value: Maybe<string>, type: Maybe<VariableType>) {
        const varIndex = this.#variables.findIndex((v) => v.name === name)
        let variable = this.#variables[varIndex]
        if (value) {
            variable.value = value
        }
        if (type) {
            variable.type = type
        }
        this.#variables[varIndex] = variable
        return this
    }

    /** Return all runtime variables. */
    public get variables() {
        return this.#variables
    }
}
