export default function plainObject(obj, acc = [], prefix = []) {
    Object.keys(obj).forEach(key => {
        const phrase = obj[key]
        const path = prefix.concat(key)
        if (typeof phrase === 'object') {
            plainObject(phrase, acc, path)
        } else {
            acc.push({path, phrase})
        }
    })

    return acc
}
