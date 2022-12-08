import React, { useEffect, useState } from 'react'
import { CalcDisplay } from './CalcDisplay'
import { Banner } from './Banner'
import { HistoryDisplay } from './HistoryDisplay'

export function CalcBody() {
    const [number, setNumber] = useState("")
    const [historyList, setHistoryList] = useState(JSON.parse(sessionStorage.getItem('historyList')) || [])
    const [prevCalculated, setCalculated] = useState(false)
    const HISTORY_LEN = 10

    useEffect(() => {
        sessionStorage.setItem('historyList', JSON.stringify(historyList))
    }, [historyList])

    const calculate = () => {
        //postfix notation implementation

        console.log("expression to eval: " + number)
        let isValidExpression = validateInput(number)
        if (!isValidExpression) {
            console.log("invalid expression found")
            setNumber(() => "Syntax Error")
        } else {
            let expression = spacedExpression(number)
            let postfix = createPostFixString(expression)
            console.log("postfix array: ", postfix)
            let val = processPostFix(postfix)
            setNumber(() => val)

            let count = 0
            historyList.forEach(element => { //count empty spaces
                (element === undefined) ? console.log("element empty") : count++
            })
            let element = [`${expression} = ${val}`]
            console.log("count: " + count)
            setHistoryList(() =>
                (count < HISTORY_LEN) ? [...historyList, element] : [element]
            )
            // useEffect is setting the history
        }
        setCalculated(() => true)
    }

    function validateInput(expression) {
        // we don't want consecutive same tokens
        // we don't want consecutive operator tokens (i.e 2+-2)
        let tokens = expression.split("")
        let pattern = /[+|\-|/|*|.]/g
        for (let i = 0; i < tokens.length; i++) {
            if (i + 1 < tokens.length) {
                let token = tokens[i]
                if (token.match(pattern)) {
                    let nextToken = tokens[i + 1]
                    if (nextToken.match(pattern))
                        return false
                }
            }
        }
        return true
    }

    function spacedExpression(number) {
        let expression = number.split("")
        let numPattern = /[0-9]|\./g
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
        let priority = { //based on shunting yard algorithm
            "*": 3,
            "/": 3,
            "+": 2,
            "-": 2
        }

        let tokens = expression.split(" ")
        let ops = [], postfix = []
        let operPattern = /[+|\-|/|*]/g
        let numPattern = /[0-9]/g
        while (tokens.length > 0) {
            //let token = tokens[i++]
            let token = tokens.shift()
            if (token.match(numPattern)) {
                postfix.push(token)
            } else if (token.match(operPattern)) {
                if (ops.length === 0) {
                    ops.unshift(token)
                } else {
                    // if ops2 has more precedence then, pop ops2
                    let temp = JSON.parse(JSON.stringify(ops))
                    for (let j = 0; j < temp.length; j++) {
                        // scenarios to pop op2
                        // if op2(stack token) is higher priority
                        let op1 = priority[token]
                        let op2 = priority[temp[j]]
                        if (op1 <= op2) {
                            postfix.push(ops.shift()) //shift pops... js is weird
                        }
                    }
                    ops.unshift(token)
                }
            }
            console.log("output stack: ", postfix)
            console.log("op stack: ", ops)
        }
        while (ops.length > 0) {
            postfix.push(ops.shift())
        }
        console.log("postfix array: " + postfix)
        return postfix
    }

    function processPostFix(arr) {
        let pattern = /[+|\-|/|*]/g
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

    function checkPrevCalculated() {
        if (prevCalculated) {
            console.log('clearing')
            setNumber(() => "")
            setCalculated(() => false)
        }
    }

    function handleKey(e) {
        //main keys
        checkPrevCalculated()
        let keyEntered = e.key
        let pattern = /([0-9])|\+|-|\/|\*/g
        let match = keyEntered.match(pattern)
        if (match)
            setNumber((num) => num + e.key)

        //other scenarios
        if (e.key === "c")
            setNumber((num) => "")
        if (e.key === "Enter")
            calculate()
        if (e.key === ".")
            setNumber((num) => num + ".")
        if (e.key === "Backspace")
            handleBackSpace(e)
    }

    function handleClick(e) {
        let val = e.target.innerText
        checkPrevCalculated()
        switch (val) {
            case "C":
                setNumber(() => "")
                break;
            case "X":
                setNumber((num) => num + "*")
                break;
            case "BACKSPACE":
                handleBackSpace(e)
                break;
            case "CH":
                handleClearClick(e)
                break;
            default:
                setNumber((num) => num + val)
                break;
        }
    }

    function handleClearClick(e) {
        sessionStorage.clear()
        setHistoryList(() => [])
    }

    function handleBackSpace(e) {
        if (prevCalculated) return
        setNumber(() => number.slice(0, number.length - 1))
    }

    const CLEAR = ["BACKSPACE", "C", "CH"]
    const opsRow1 = ["7", "8", "9", "X"]
    const opsRow2 = ["4", "5", "6", "-"]
    const opsRow3 = ["1", "2", "3", "/"]
    const opsRow4 = ["0", ".", "+"]
    const BTN_CLASSNAME = 'btn defaultColor roundBtn'
    const BACKBTN_CLASSNAME = 'btn defaultColor backSpaceBtn'

    return (
        <div>
            <Banner />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className='border-window' tabIndex={0} onKeyDown={(e) => handleKey(e)}>
                    <CalcDisplay value={number} />
                </div>
                <div style={{ width: "25em", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div>
                        <button className={BACKBTN_CLASSNAME} onClick={(e) => handleClick(e)}>{CLEAR[0]}</button>
                        <button className={BTN_CLASSNAME} onClick={(e) => handleClick(e)}>{CLEAR[1]}</button>
                        <button className={BTN_CLASSNAME} onClick={(e) => handleClick(e)}>{CLEAR[2]}</button>
                    </div>
                    <div>
                        {opsRow1.map((ops, index) => <button key={index} className={BTN_CLASSNAME} onClick={(e) => handleClick(e)}>{ops}</button>)}
                    </div>
                    <div>
                        {opsRow2.map((ops, index) => <button key={index} className={BTN_CLASSNAME} onClick={(e) => handleClick(e)}>{ops}</button>)}
                    </div>
                    <div>
                        {opsRow3.map((ops, index) => <button key={index} className={BTN_CLASSNAME} onClick={(e) => handleClick(e)}>{ops}</button>)}
                    </div>
                    <div>
                        {opsRow4.map((ops, index) => <button key={index} className={BTN_CLASSNAME} onClick={(e) => handleClick(e)}>{ops}</button>)}
                        <button className='btn defaultColor roundBtn' onClick={calculate}>=</button>
                    </div>
                </div>
                <div>
                    {(historyList.length < 1) ? <HistoryDisplay value={[]} /> : <HistoryDisplay value={historyList} />}
                </div>
            </div>
        </div>
    )
}