import React, { useState } from 'react';
import { CalcButton } from './CalcButton';



export function CalcBody() {
    const [number, setNumber] = useState(0)

    return (
        <div>
            <div>
                <CalcButton val={7} />
                <CalcButton val={8} />
                <CalcButton val={9} />
            </div>
            <div>
                <CalcButton val={4} />
                <CalcButton val={5} />
                <CalcButton val={6} />
            </div>
            <div>
                <CalcButton val={1} />
                <CalcButton val={2} />
                <CalcButton val={3} />
            </div>
            <div>
                <CalcButton val={0} />
            </div>
        </div>
    )
}