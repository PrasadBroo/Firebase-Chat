import React from 'react'

export default function chatMsg(props) {
    return (
        <div className={`user-msg `+ props.what}>
            <div className="dumb"></div>
            <div className="wrapper">
                <img src={props.image} alt="user"/>
                <p>{props.msg}</p>
            </div>
            
        </div>
    )
}
