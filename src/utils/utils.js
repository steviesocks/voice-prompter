export const cleanWhiteSpaces = (string) => {
    return string.replace(/\xA0/gmi, ' ')
}