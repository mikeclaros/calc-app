import React from 'react';


export function HistoryDisplay({ value }) {
    const [historyList] = [value]

    return (
        <div>
            <h1 className='history-window'>
                <span style={{ fontFamily: "consolas", fontSize: "1em" }}>History</span>
                {console.log("HistoryList: ", historyList)} {console.log("sessionStorage: ", sessionStorage.getItem('historyList'))}
                {(historyList.length < 1) ? console.log('empty historyList') : historyList.map((data, index) => <li className='bullet-less' key={index + data}>{data}</li>)}
            </h1>
        </div>
    )
}