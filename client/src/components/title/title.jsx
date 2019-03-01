import React from 'react';

import './title.scss'


function Title(props) {
    const { className, ...newProps } = props;
    return (
        <h2 className={`title ${className}`} {...newProps}>
            {props.children}
        </h2>
    )
}

export default Title;