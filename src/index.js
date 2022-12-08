import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { CalcBody } from './components/CalcBody';

// disable logs in prod
console.log("what is node env?: " + process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
    console.log = () => { }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CalcBody />);
