import React, { useState } from 'react';
import "../index.css"

export function CalcDisplay({ value }) {
    const [display, setDisplay] = useState(value)

    return (
        <h1 className='border-window'>
            {display}
        </h1>
    )
}