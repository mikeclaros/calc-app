import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled.span`
    background: teal;
    font-family: "consolas", monospace;
    font-size: 5vw;
    padding: 2%;
`
export function Banner() {
    return (
        <div>
            <StyledSpan>Calc-App</StyledSpan>
        </div>
    )
}