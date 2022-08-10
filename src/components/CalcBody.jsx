import { clear } from '@testing-library/user-event/dist/clear'
import React, { useEffect, useState } from 'react'
import { CalcDisplay } from './CalcDisplay'

export function CalcBody() {
    const [number, setNumber] = useState("")
    const [historyList, setHistoryList] = useState([])

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
        multiply: () => setNumber((num) => num + "*"),
        subtract: () => setNumber((num) => num + "-"),
        add: () => setNumber((num) => num + "+"),
        enter: () => setNumber((num) => num + "="),
        point: () => setNumber((num) => num + "."),
    }

    const calculate = () => {
        //postfix notation implementation
        console.log("expression to eval: " + number)
        let expression = spacedExpression(number)
        let postfix = createPostFixString(expression)
        console.log("postfix array: ", postfix)
        let val = processPostFix(postfix)
        setNumber(() => val)
        historyList.push(`${expression} = ${val}`)
    }

    function spacedExpression(number) {
        let expression = number.split("")
        let numPattern = /[0-9]/g
        let spacesIncluded = ""
        expression.forEach(val => {
            if (val.match(numPattern)) {
                spacesIncluded += val
            } else {
                //not number return with space before and after
                spacesIncluded += " " + val + " "
            }
        })
        return spacesIncluded
    }

    function createPostFixString(expression) {
        let priority = { //based on shunting yard algorithm aka reverse polish notation
            "*": 3,
            "/": 3,
            "+": 2,
            "-": 2
        }

        let tokens = expression.split(" ")
        let ops = [], postfix = []
        let operPattern = /[\+|\-|\/|\*]/g
        let numPattern = /[0-9]/g
        while (tokens.length > 0) {
            //let token = tokens[i++]
            let token = tokens.shift()
            if (token.match(numPattern)) {
                postfix.push(token)
            } else if (token.match(operPattern)) {
                if (ops.length == 0) {
                    ops.unshift(token)
                } else {
                    // if ops2 has more precedence then, pop ops2
                    for (let j = 0; j < ops.length; j++) {
                        // scenarios to pop op2
                        // if op2(stack token) is higher priority
                        let op1 = priority[token]
                        let op2 = priority[ops[j]]
                        if (op1 <= op2) {
                            postfix.push(ops.shift()) //shift pops... js is weird
                        }
                    }
                    ops.unshift(token)
                }
            }
        }
        while (ops.length > 0) {
            postfix.push(ops.shift())
        }
        console.log("postfix array: " + postfix)
        return postfix
    }

    function processPostFix(arr) {
        let pattern = /[\+|\-|\/|\*]/g
        let stack = []
        while (arr.length > 0) {
            let item = arr.shift()
            if (item.match(pattern)) {
                console.log("op: ", item)
                let right = parseFloat(stack.pop())
                let left = parseFloat(stack.pop())
                let value
                console.log(`Calc being performed: ${left.toString()} ${item} ${right.toString()}`)
                switch (item) {
                    case "+":
                        value = left + right
                        break
                    case "-":
                        value = left - right
                        break
                    case "/":
                        value = left / right
                        break
                    case "*":
                        value = left * right
                        break
                    default:
                        console.log("no match")
                        break
                }
                stack.push(value)
            } else {
                stack.push(item)
            }
            console.log("stack: ", stack)
        }
        console.log("stack: ", stack)
        return stack[0]
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
                    <h1 className='history-window'>
                        {historyList.map((data, index) => <li className='bullet-less' key={index + data}>{data}</li>)}
                    </h1>
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