import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';


import './button.scss'

function Button(props) {
    const { isButton, primary, secondary, className, ...newProps } = props;
    const buttonClasses = props.secondary ? `button-secondary ${className}` : `button-primary ${className}`
    return (
        <>
            {
                isButton
                    ?
                    <button className={buttonClasses} {...newProps}>
                        {props.children}
                    </button>
                    :
                    <Link smooth className={buttonClasses} {...newProps}>
                        {props.children}
                    </Link>
            }

        </>
    )
}

export default Button;