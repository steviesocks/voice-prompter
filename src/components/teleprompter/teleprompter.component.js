import React, { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { handleResults } from '../../utils/utils';

import { StyledTeleprompter, Interim } from './teleprompter.styles';

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
        
        speechAPI.current.onstart = () => { console.log('start') }
        speechAPI.current.onresult = (response) => { handleResults(response, script, setResults, handleProgress, progress) }
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