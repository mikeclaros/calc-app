import React, { useState } from 'react';
import { CalcButton } from './CalcButton';
import { CalcDisplay } from './CalcDisplay';



export function CalcBody() {
    const [number, setNumber] = useState("")

    return (
        <div>
            <div>
                <CalcDisplay value={number} />
            </div>
            <div>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "7")}>7</button>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "8")}>8</button>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "9")}>9</button>
            </div>
            <div>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "4")}>4</button>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "5")}>5</button>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "6")}>6</button>
            </div>
            <div>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "1")}>1</button>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "2")}>2</button>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "3")}>3</button>
            </div>
            <div>
                <button className='btn defaultColor roundBtn' onClick={() => setNumber((num) => num + "0")}>0</button>
            </div>
        </div>
    )
}