import React, { useState } from 'react'
import './tasbej'

function Tasbeh(numbers,text) {

  return (
    <div className="circle">
        <div className="dots sec_dot" />
        <svg>
            <circle cx={120} cy={120} r={120} id="ss" />
        </svg>
        <button className="tasbehBts" onClick={()=> tasbeh(numbers)}><span className="count">{count}</span> {text}</button>
    </div>

  )
}

export default Tasbeh
