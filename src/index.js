import Translator from './Translator'

export default function createTranslator({locale, phrases}) {
    return (new Translator({locale, phrases})).t
}
