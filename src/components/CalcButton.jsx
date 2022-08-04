import React, { useState } from 'react';
import '../index.css'

export function CalcButton({ val }) {
    const [number, setNumber] = useState(val)

    return (
        <button className='btn defaultColor roundBtn'>{number.toString()}</button>
    )
}