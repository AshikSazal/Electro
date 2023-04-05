import React from 'react'

import './Input.css';

const Input = (props) => {
  return (
    <div className='input'>
        <input id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value=""
         />
    </div>
  )
}

export default Input