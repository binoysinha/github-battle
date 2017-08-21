import React, { Component } from 'react';
import '../styles/User.scss';

export default class User extends Component {
    constructor(props) {
        super(props)
    }

    checkIn = (ev) => {
        const seatNo = Number(this.props.match.params.id) - 1;
        let column = 'column1';
        this.props.database.ref(`${column}/${seatNo}/status`).set('checked-in');
        document.querySelector('.check-in-btn').style.display = 'none';
        document.querySelector('.thanks').style.display = 'block';
    }

    render() {
        return(
            <div className="user-page">
                <h4>Trip Details</h4>
                <div className="bus-info">
                    <p>Operator: SRS Travels</p>
                    <p>SRC-DEST: Bangalore - Tirupati</p>
                    <p>DOJ: 19th August, 2017</p>
                    <p>Boarding pt: Madiwala</p>
                </div>
                <p>Your bus is schedule to arrive.</p>
                <p>You reached your boarding point</p>
                <p>Kindly confirm it, by clicking on Reached button</p>
                <button className="check-in-btn" onClick={this.checkIn}>Reached</button>
                <h2 className="thanks">Thank you!!!</h2>
            </div>
        )
    }
}