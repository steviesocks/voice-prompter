import React, { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import stringSimilarity from 'string-similarity'

import styled from 'styled-components';

const StyledTeleprompter = styled.div`
    border: 1px solid blue;
    height: 40vh;
    width: 60vw;
    padding: 20px;
    color: white;
    white-space: pre-wrap;
    font-size: 2.5em;
    overflow-y: auto;
`

const Interim = styled.div`
    color: white;
    margin: 20px;
    max-height: 100px;
    width: auto;
    max-width: 60vw;
    background-color: rgba(0,0,0,.2);
    border-radius: 20px;
    font-size: .7em;
`

const cleanWord = word => {
    console.log("word", word)
    return word.trim().toLocaleLowerCase().replace(/[^a-z]/gi, '')
}

const Teleprompter = ({ inputText, isListening, progress, handleProgress }) => {

    const speechAPI = useRef(null);
    const scrollRef = useRef(null)

    const [script, setScript] = useState([])
    const [words, setWords] = useState([])
    const [results, setResults] = useState("")



    useEffect(() => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            console.log('Web Speech API not supported')
        } else {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            speechAPI.current = new SpeechRecognition();

            speechAPI.current.interimResults = true;
            speechAPI.current.continuous = true;
        }
    }, [])

    useEffect(() => {
        if (isListening) {
            speechAPI.current.start()
        } else {
            speechAPI.current.stop()
        }
    }, [isListening])

    useEffect(() => {
        const splitScript = inputText.split(" ")
        const splitWords = inputText.split(/\s+/gmi)
        setScript(splitScript)
        setWords(splitWords)
    }, [inputText])

    useEffect(() => {
        const handleResults = ({ results }) => {
            // console.log(results)
            const interim = Array.from(results)
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

        speechAPI.current.onstart = () => { console.log('start') }
        speechAPI.current.onresult = (response) => { handleResults(response) }
        speechAPI.current.onerror = () => { console.log('error') }
        speechAPI.current.onend = () => { console.log('end') }

        return () => {
            speechAPI.current.onstart = null;
            speechAPI.current.onresult = null;
            speechAPI.current.onerror = null;
            speechAPI.current.onend = null;
        }
    }, [script, handleProgress, progress])

    useEffect(() => {
        const upcomingWord = scrollRef.current
            .querySelector(
                `[data-index='${progress - 3}']`
            )

        if (upcomingWord) {
            upcomingWord
                .scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start'
            })
        } else {
            scrollRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }

        }, [progress])

    return (
        <div>
            <StyledTeleprompter ref={scrollRef}>
                {script.map((word, index) => (
                    <span key={uuidv4()} data-index={index} style={{ color: index < progress ? 'grey' : 'white' }}>
                        {`${word} `}
                    </span>
                ))}
            </StyledTeleprompter>
            {results && <Interim>{results}</Interim>}
        </div>


    )

}

export default Teleprompter;