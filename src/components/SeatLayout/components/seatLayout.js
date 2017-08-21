import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/seatLayout.scss';

export default class SeatLayout extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const seatsLayout1 = this.props.column1.map((seats,idx) => {
            return (
                <Link 
                    className='button' 
                    to={{
                        pathname: '/chat',
                        state: {         
                            seatNo: seats.seatNo,
                            status: seats.status,
                            contact: seats.contact,
                            name: seats.name,
                            gender: seats.gender,
                            age: seats.age,
                            bp:seats.bp,
                            column:'column1',
                            id:idx
                        }
                    }} key={seats.seatNo}>
                     <div className={'seats '+ seats.status +' '+ seats.filteredBp} data-seatId={seats.seatNo}>{seats.seatNo}</div>
                </Link> 
            )
        });
        const seatsLayout2 = this.props.column2.map((seats,idx) => {
            return (
                <Link 
                className='button' 
                to={{
                    pathname: '/chat',
                    state: {         
                        seatNo: seats.seatNo,
                        status: seats.status,
                        contact: seats.contact,
                        name: seats.name,
                        gender: seats.gender,
                        age: seats.age,
                        bp:seats.bp,
                        column:'column2',
                        id:idx
                    }
                }} key={seats.seatNo}>
                     <div className={'seats '+ seats.status +' '+ seats.filteredBp} data-seatId={seats.seatNo}>{seats.seatNo}</div>
                </Link> 
            )
            });

        return (
            <div>
                <div className="seat-layout">
                    <div className="col-1">{seatsLayout1}</div>
                    <div className="col-2">{seatsLayout2}</div>
                </div>
                <div className="status-bar">
                    <div className="row">
                        <div className="status-block checked-in"></div>Reached
                    </div>
                    <div className="row">
                        <div className="status-block boarded"></div>Boarded
                    </div>
                    <div className="row">
                        <div className="status-block missed"></div>Missed
                    </div>
                </div>
            </div>
        )
    }
}