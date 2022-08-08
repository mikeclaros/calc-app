import { clear } from '@testing-library/user-event/dist/clear';
import React, { useEffect, useState } from 'react';
import { CalcDisplay } from './CalcDisplay';

export function CalcBody() {
    const [number, setNumber] = useState("")

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

    const calculate = () => {
        console.log("expression to eval: " + number)
        let pattern = /[\+|\-|\/|X]/g
        console.log("is there a pattern?: ", pattern)
        console.log("regex match?: " + number.match(pattern))
        // let op = number.replace(pattern, " ")
        let op = number.match(pattern)[0]
        let operands = number.replace(pattern, " ").split(" ")
        let op1 = parseFloat(operands[0])
        let op2 = parseFloat(operands[1])
        let value
        switch (op) {
            case "+":
                value = op1 + op2
                break;
            case "-":
                value = op1 - op2
                break;
            case "/":
                value = op1 / op2
                break;
            case "X":
                value = op1 * op2
                break;
            default:
                console.log("no match")
                break;
        }

        setNumber(() => value)
    }

    function handleKey(e) {
        //main keys
        let keyEntered = e.key
        let pattern = /([0-9])|\+|\-|\/|\*/g
        let match = keyEntered.match(pattern)
        if (match)
            setNumber((num) => num + e.key)

        //other scenarios
        if (e.key === "c")
            setNumber((num) => "")

        if (e.key === "Enter")
            calculate()
    }


    return (
        <div>
            <div>
                <div tabIndex={0} onKeyDown={(e) => handleKey(e)}>
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
                    <button className='btn defaultColor roundBtn' onClick={calculate}>=</button>
                    {/* <button className='btn defaultColor rountBtn' onCl */}
                </div>
            </div>
        </div >
    )
}