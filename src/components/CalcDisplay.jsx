import React, { useContext, useState } from 'react';
import "../index.css"

export function CalcDisplay({ value }) {
    return (
        <h1 className='border-item'>
            {value}
        </h1>
    )
}