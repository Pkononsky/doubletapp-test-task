import React from 'react';

export default function ColorSelect({className, text, colorList, stateProp, handler}) {
    function handleChange(event) {
        let state = {};
        state[stateProp] = event.target.id;
        handler(state);
    }

    return (
        <div className={className}>
            <p className={`${className}-text`}>
                {text}
            </p>
            <div className={`${className}-images`}>
                {
                    colorList.map((color) =>
                        <label onChange={handleChange}>
                            <input className={`${className}-input`} name="color" type="radio" id={color.id}/>
                            <img className={`${className}-img`} src={color.data} key={color} alt="color pic"/>
                        </label>
                    )
                }
            </div>

        </div>
    )
}
