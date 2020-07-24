import React from 'react';

export default function DropDownList({className, text, listOptions, img, stateProp, handler}) {

    function getIdByValue(value) {
        return listOptions.filter((option) => option.data === value)[0]?.id
    }

    function handleChange(event) {
        const id = getIdByValue(event.target.value);

        handler({[stateProp]: id === 0 ? id : id || ''});
    }

    return (
        <div className={className}>
            {
                text ?
                    <p className={`${className}-text`}>
                        {text}
                    </p>
                    :
                    null
            }

            <select className={`${className}-select`} onChange={handleChange}>
                <option value="" disabled selected
                        className={`${className}-option default-option`}>Выбрать</option>
                {
                    listOptions.map(option => <option className={`${className}-option`} key={option.id}
                                                      id={option.id}>{option.data}</option>)
                }
            </select>

            <img src={img} alt="drop-list-ico" className={`${className}-img`}/>
        </div>
    )
}
