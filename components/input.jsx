import React from 'react';

let inputClass = 'input';
const WRONG_VALUE_CLASS = ' red-border';

export default function Input({className, text, placeHolder, stateProp, handler, isInt}) {

    function handleChange(event) {
        const value = event.target.value;
        if (isInt) {
            if (!isNaN(parseInt(value))) {
                event.target.className = `${className}-${inputClass}`;
                handler({[stateProp]: value});
            } else {
                event.target.className += WRONG_VALUE_CLASS;
                handler({[stateProp]: ''});
            }
        } else {
            handler({[stateProp]: value});
        }
    }

    return (
        <div className={className}>
            <p className={`${className}-text`}>
                {text}
            </p>
            <input type="text" className={`${className}-${inputClass}`} placeholder={placeHolder}
                   onChange={handleChange}/>
        </div>
    )
}
