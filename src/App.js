import React, { useState } from 'react'
import './App.css';
import Teleprompter from './components/teleprompter.component';
import { script1, script2 } from './utils/texts';

import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Button = styled.button`
  padding: 5px;
  margin: 20px;
  width: 150px;
  font-size: 1em;
  color: white;
  background: transparent;
  border: 3px solid white;
  border-radius: 5px;
  ${props => props.hover === "red"
    ? '&:hover { background: red }'
    : '&:hover { background: grey }'
  };
  transition: all .2s ease;
`

const Textarea = styled.textarea`
  width: 60vw;
  height: 100px;
  padding: 20px;
  font-size: 1em;
`

const App = () => {

  const [isListening, setIsListening] = useState(false)
  const [inputWords, setInputWords] = useState("")
  const [progress, setProgress] = useState(0)


  const handleInput = (event) => {
    const { value } = event.target;
    setInputWords(value)
  }

  const handleStartStop = () => {
    setIsListening(!isListening)
  }

  const handleReset = () => {
    setIsListening(false);
    setProgress(0)
  }

  const handleProgress = (newIndex) => {
    setProgress(newIndex)
  }

  const handleChooseScript = (event) => {
    if (event.target.name === 'script1') {
      setInputWords(script1)
    } else {
      setInputWords(script2)
    }
    
  }

  return (
    <StyledApp>
      {/* <Textarea value={inputWords} onChange={handleInput} disabled={isListening}></Textarea> */}
      <div>
        <Button onClick={handleChooseScript} name="script1">Script 1</Button>
        <Button onClick={handleChooseScript} name="script2">Script 2</Button>
      </div>
      <div>
        <Button onClick={handleStartStop} hover="red">{isListening ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleReset} hover="grey">Reset</Button>
      </div>
      <Teleprompter 
        isListening={isListening} 
        inputText={inputWords} 
        progress={progress}
        handleProgress={handleProgress}
        />
    </StyledApp>
  );
}

export default App;
