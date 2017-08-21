import React, { Component } from 'react';
import '../styles/MsgList.scss';

export default class MsgList extends Component {
    constructor(props) {
        super(props)
    }

    selectMsg = (ev) => {
        this.props.selectMsg(ev.target.textContent);
    }

    closePopup = (e) => {
        e.stopPropagation();
        this.props.closePopup();
    }

    render() {
        return (
            <div className="msg-block hide" onClick={this.selectMsg}>
                <ul>
                    <li>Hello Sir/Madam, Bus has arrived. Come Soon</li>
                    <li>Hello Sir/Madam, We waited for you for considerable time. You were late. Hence, we left</li>
                    <li>Hello Sir/Madam, We are running late. Sorry for the inconvenince. </li>
                    <li>Hello Sir/Madam, Bus has arrived. Come Soon</li>
                    <li>Hello Sir/Madam, Bus has arrived. Come Soon</li>
                </ul>
                <button
                    className="btn btn-success post-editor-button msg-btn"
                    onClick={this.closePopup}
                >
                    No, I will write my own message
                </button>
            </div>
        )
    }
}