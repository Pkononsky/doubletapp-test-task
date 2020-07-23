import React from 'react';

export default function Input({className, text, placeHolder, stateProp, handler}) {
    function handleChange(event) {
        handler({[stateProp]: event.target.value});
    }

    return (
        <div className={className}>
            <p className={`${className}-text`}>
                {text}
            </p>
            <input type="text" className={`${className}-input`} placeholder={placeHolder} onChange={handleChange}/>
        </div>
    )
}
