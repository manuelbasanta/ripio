import React from 'react';
import './styles/input.css';

const Input = (props) => {

    return (
        <label className={!props.content.valid ? "input-group invalid" : "input-group"}>
           {props.icon}
            <input placeholder={props.placeholder} name={props.name} type="text" value={props.content.value} onChange={props.handleChange} autoComplete="off"/>
            {( props.content.value === '' && !props.content.valid ) && <span className="error-msg">Este campo es obligatorio.</span>}
        </label>
    );
}

export default Input;