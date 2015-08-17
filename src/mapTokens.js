const TOKEN = '@_T_@'
const NAMETOKEN = '@_N_@'

export default function mapTokens(t: (message: string, params: Map<string, string>) => string , message: string, params: object): Array<string|object|func>|string {
    const elements = {}
    const tokens = {}
    let hasElements = false
    Object.keys(params).forEach(name => {
        const el = params[name]
        if (typeof el === 'function' || typeof el === 'object') {
            const nm = NAMETOKEN + name + NAMETOKEN
            elements[nm] = el
            tokens[name] = TOKEN + nm + TOKEN
            hasElements = true
        } else {
            tokens[name] = params[name]
        }
    })
    const str = t(message, tokens)
    if (typeof message !== 'string') {
        throw new Error('message is not string')
    }

    return hasElements
        ? str
            .split(TOKEN)
            .filter(part => !!part)
            .map(part => elements[part] || part)
        : str
}
