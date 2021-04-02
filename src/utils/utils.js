import stringSimilarity from 'string-similarity';

export const cleanWhiteSpaces = (string) => {
    return string.replace(/\xA0/gmi, ' ')
}

const cleanWord = word => {
    // console.log("word", word)
    return word.trim().toLocaleLowerCase().replace(/[^a-z]/gi, '')
}

export const handleResults = (response, script, setResults, handleProgress, progress) => {
    // console.log("results:", response)
    const interim = Array.from(response.results)
        // .filter(res => !res.isFinal)
        .map(item => item[0].transcript)
        .join(" ")

    console.log('interim', interim)

    setResults(interim)

    const newIndex = interim.split(' ').reduce((acc, word) => {
        if (acc >= script.length) {
            return acc;
        }
        const similarity = stringSimilarity.compareTwoStrings(
            cleanWord(word),
            cleanWord(script[acc])
        )
        acc += similarity > 0.75 ? 1 : 0;
        return acc
    }, progress)
    if (newIndex > progress && newIndex <= script.length) {
        handleProgress(newIndex)
    }

}