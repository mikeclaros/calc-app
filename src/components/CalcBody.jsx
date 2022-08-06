import React, { useEffect, useState } from 'react';
import { CalcDisplay } from './CalcDisplay';

export function CalcBody() {
    const [number, setNumber] = useState("")

    // function displayButtons() {
    //     let btnClassName = 'btn defaultColor rountBtn'
    //     let operators = ["/", "X", "-", "+"]
    //     let numbers = 9
    //     let map = new Map()
    //     //map buttons to their position in the array
    //     for (let i = 0; i < maxInRow; i++) {
    //         map(<button className={btnClassName} onClick={() => setNumber((val) => val + i.toString())}>{val}</button>)
    //     }

    //     return arr
    // }

    const set = {
        zero: () => setNumber((num) => num + "0"),
        one: () => setNumber((num) => num + "1"),
        two: () => setNumber((num) => num + "2"),
        three: () => setNumber((num) => num + "3"),
        four: () => setNumber((num) => num + "4"),
        five: () => setNumber((num) => num + "5"),
        six: () => setNumber((num) => num + "6"),
        seven: () => setNumber((num) => num + "7"),
        eight: () => setNumber((num) => num + "8"),
        nine: () => setNumber((num) => num + "9"),
        clear: () => setNumber((num) => ""),
        divide: () => setNumber((num) => num + "/"),
        multiply: () => setNumber((num) => num + "X"),
        subtract: () => setNumber((num) => num + "-"),
        add: () => setNumber((num) => num + "+"),
        enter: () => setNumber((num) => num + "="),
        point: () => setNumber((num) => num + "."),
    }


    return (
        <div>
            <div>
                <div>
                    <CalcDisplay value={number} />
                </div>
                <div>
                    <button className='btn defaultColor roundBtn' onClick={set.clear}>C</button>
                </div>
                <div>
                    <button className='btn defaultColor roundBtn' onClick={set.seven}>7</button>
                    <button className='btn defaultColor roundBtn' onClick={set.eight}>8</button>
                    <button className='btn defaultColor roundBtn' onClick={set.nine}>9</button>
                    <button className='btn defaultColor roundBtn' onClick={set.multiply}>X</button>
                </div>
                <div>
                    <button className='btn defaultColor roundBtn' onClick={set.four}>4</button>
                    <button className='btn defaultColor roundBtn' onClick={set.five}>5</button>
                    <button className='btn defaultColor roundBtn' onClick={set.six}>6</button>
                    <button className='btn defaultColor roundBtn' onClick={set.subtract}>-</button>
                </div>
                <div>
                    <button className='btn defaultColor roundBtn' onClick={set.one}>1</button>
                    <button className='btn defaultColor roundBtn' onClick={set.two}>2</button>
                    <button className='btn defaultColor roundBtn' onClick={set.three}>3</button>
                    <button className='btn defaultColor roundBtn' onClick={set.divide}>/</button>
                </div>
                <div>
                    <button className='btn defaultColor roundBtn' onClick={set.zero}>0</button>
                    <button className='btn defaultColor roundBtn' onClick={set.point}>.</button>
                    <button className='btn defaultColor roundBtn' onClick={set.add}>+</button>
                    <button className='btn defaultColor roundBtn' onClick={set.enter}>=</button>
                    {/* <button className='btn defaultColor rountBtn' onCl */}
                </div>
            </div>
        </div >
    )
}