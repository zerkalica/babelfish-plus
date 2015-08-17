import Babelfish from 'babelfish'

import mapTokens from './mapTokens'
import plainObject from './plainObject'
import __debug from 'debug'
const debug = __debug('qiwi:platform:Translator:debug')

export default class Translator {
    constructor({locale, phrases}: {
        locale: string,
        phrases: object
    }) {
        this._locale = locale
        const babelfish = this._babelfish = new Babelfish(locale)
        plainObject(phrases).forEach(({path, phrase}) => babelfish.addPhrase(locale, path.join('.'), phrase))
        this.t = ::this.t
        this._t = ::this._t
    }

    _t(message: string, params: Map<string, string>): string {
        const babelfish = this._babelfish
        if (!babelfish.hasPhrase(this._locale, message)) {
            babelfish.addPhrase(this._locale, message, message)
        }

        return babelfish.translate(this._locale, message, params || {})
    }

    t(message: string, params: ?Map<string, string|object|func>): Array<string|object|func>|string {
        return mapTokens(this._t, message, params || {})
    }
}
