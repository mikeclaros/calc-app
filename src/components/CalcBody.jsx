import React, { useEffect, useState } from 'react'
import { CalcDisplay } from './CalcDisplay'
import { Banner } from './Banner'
import { HistoryDisplay } from './HistoryDisplay'

export function CalcBody() {
    const [number, setNumber] = useState("0")
    const [prevCalculatedValue, setPrevCalculatedValue] = useState("")
    const [historyList, setHistoryList] = useState(JSON.parse(sessionStorage.getItem('historyList')) || [])
    const [prevCalculated, setCalculated] = useState(false)
    const [active, setActive] = useState(false)
    const HISTORY_LEN = 10
    const operPattern = /[+|\-|/|*]/g
    const numPattern = /[0-9]|\./g

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
            setPrevCalculatedValue(() => val)
            setHistoryList(() =>
                (count < HISTORY_LEN) ? [...historyList, element] : [element]
            )
            // useEffect is setting the history
        }
        setCalculated(() => true)
    }

    function validateInput(expression) {
        // we don't want consecutive same op tokens
        // we don't want consecutive operator tokens (i.e 2+-2)

        let tokens = expression.toString().split("")
        for (let i = 0; i < tokens.length; i++) {
            if (i + 1 < tokens.length) {
                let token = tokens[i]
                if (token.match(operPattern)) {
                    let nextToken = tokens[i + 1]
                    if (nextToken.match(operPattern))
                        return false
                }
            }
        }
        return true
    }

    function spacedExpression(number) {
        let expression = number.toString().split("")
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
        while (tokens.length > 0) {
            if (tokens[0] === "" && tokens[1] === "-") {
                tokens.shift() //remove empty string created from having non-num val at beginning of expression
                tokens.unshift(0)
            }
            let token = tokens.shift().toString()
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
        let stack = []
        while (arr.length > 0) {
            let item = arr.shift()
            if (item.match(operPattern)) {
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
        setActive((active) => (active) ? !active : active) //if active then deactivate
        let keyEntered = e.key
        let pattern = /([0-9])|\+|-|\/|\*/g
        let match = keyEntered.match(pattern)

        if (match)
            handleDefaultCase(keyEntered)

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
        setActive((active) => (active) ? !active : active) //don't want to toggle, just turn off
        switch (val) {
            case "C":
                setNumber(() => "0")
                setPrevCalculatedValue(() => '')
                break;
            case "BACKSPACE":
                handleBackSpace(e)
                break;
            case "CH":
                handleClearClick(e)
                break;
            // case NEGATIVE_SYM:
            //     val = "-"
            case "X":
                val = "*"
            default:
                handleDefaultCase(val)
                break;
        }
    }

    function handleDefaultCase(val) {
        val = prefixPrevCalcIfExist(val)
        if (val.match(numPattern) && prevCalculated !== '') {
            setPrevCalculatedValue(() => '')
        }
        setNumber((num) => (num === '0' && !val.match(operPattern)) ? val : num + val) // if num is 0 let new num replace 0
    }

    function prefixPrevCalcIfExist(val) {
        //if there is an op and a prev calc done, then assign the op to the previous calc
        // if history was cleared and a previous calc is still displayed allow use of that previous calc
        if (val.match(operPattern) && prevCalculatedValue !== '' && number === '') {
            console.log('VAL: ' + val + '\nNUMBER: ' + number)
            val = prevCalculatedValue + val
            setPrevCalculatedValue(() => '')
        }
        return val
    }

    function handleClearClick(e) {
        sessionStorage.clear()
        setHistoryList(() => [])
    }

    function handleBackSpace(e) {
        if (prevCalculated) {
            let tmpStr = prevCalculatedValue.toString() // gets interpreted as number for some reason, so force to str
            setNumber(() => tmpStr.slice(0, tmpStr.length - 1))
            setPrevCalculatedValue(() => '')
            setCalculated(() => false)
            return
        }
        setNumber(() => (number.toString().length < 2) ? '0' : number.slice(0, number.length - 1))
    }

    function handleDivActive(e) {
        setActive((active) => !active) //toggle
    }

    //const NEGATIVE_SYM = "+⇄-"
    const CLEAR = ["BACKSPACE", "C", "CH"]
    const opsRow1 = ["7", "8", "9", "X"]
    const opsRow2 = ["4", "5", "6", "-"]
    const opsRow3 = ["1", "2", "3", "/"]
    const opsRow4 = ["0", ".", "+"]
    const BTN_CLASSNAME = 'btn defaultColor btnSmaller'
    const BACKBTN_CLASSNAME = 'btn defaultColor btnBackSpace'
    const HIGHLIGHT = 'highlight'

    return (
        <div>
            <Banner />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div id='display' className={(active) ? HIGHLIGHT + ' border-window' : 'border-window'} tabIndex={0} onKeyDown={(e) => handleKey(e)} onClick={(e) => handleDivActive(e)}>
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
                            <button className={BTN_CLASSNAME} onClick={calculate}>=</button>
                        </div>
                    </div>
                    <div>
                        {(historyList.length < 1) ? <HistoryDisplay value={[]} /> : <HistoryDisplay value={historyList} />}
                    </div>
                </div>
            </div>
        </div>
    )
}