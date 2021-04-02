import React, { useState } from 'react'
import Teleprompter from './components/teleprompter/teleprompter.component';
import { script1, script2 } from './utils/texts';

import { StyledApp, Button, TextArea } from './App.styles';



const App = () => {

  const [isListening, setIsListening] = useState(false)
  const [inputWords, setInputWords] = useState("")
  const [progress, setProgress] = useState(0)
  console.log("progress:", progress)

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
