import styled from 'styled-components';


export const StyledApp = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export const Button = styled.button`
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