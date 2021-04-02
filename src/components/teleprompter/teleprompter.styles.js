import styled from 'styled-components';

export const StyledTeleprompter = styled.div`
    border: 1px solid blue;
    height: 40vh;
    width: 60vw;
    padding: 20px;
    color: white;
    white-space: pre-wrap;
    font-size: 2.5em;
    overflow-y: auto;
`

export const Interim = styled.div`
    color: white;
    margin: 20px;
    max-height: 100px;
    width: auto;
    max-width: 60vw;
    background-color: rgba(0,0,0,.2);
    border-radius: 20px;
    font-size: .7em;
`