import React, { Component} from 'react';
import '../styles/PassengerInfo.scss';


class PassengerInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: '',
        }
    }

    handleChange = (ev) => {
        this.props.updateStatus(ev.target.value);
        this.setState({selectedOption: ev.target.value});
        
    }

    render() {
        return (
            <div className="passenger-info">
                <p><span>Name:</span> {this.props.passengerData.name}</p>
                <p><span>Age:</span> {this.props.passengerData.age} </p>
                <p><span>Gender:</span> {this.props.passengerData.gender}</p>
                <div className="ch-sts"><span>Status:</span> 
                    <div className="select-field">
                        <div>
                            <input id="radio-1" className="radio-custom" value="boarded" name="radio-group" type="radio" onChange={this.handleChange} checked={this.state.selectedOption === 'boarded'} />
                            <label htmlFor="radio-1" className="radio-custom-label">Boarded</label>
                        </div>
                        <div>
                            <input id="radio-2" className="radio-custom" value="missed" name="radio-group" onChange={this.handleChange} type="radio" checked={this.state.selectedOption === 'missed'} />
                            <label htmlFor="radio-2" className="radio-custom-label">Missed</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default PassengerInfo;