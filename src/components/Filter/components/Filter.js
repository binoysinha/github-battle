import React, { Component } from 'react';
import '../styles/Filter.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  selectBP = (ev) => { 
      const bpPoints = document.querySelectorAll('.bp');
        for (let bp of [...bpPoints]) {
        bp.style.color = 'black';
      }
      ev.target.style.color = 'green';
      ev.target.style.fontSize = '20px';
      this.props.filter(ev.target.textContent);
  }

  render() {
    return (
      <div className="filter-block hide" onClick={this.selectBP}>
        <ul>
            <li className="bp">Madiwala</li>
            <li className="bp">BTM</li>
            <li className="bp">Silk Board</li>
            <li className="bp">Kormangla</li>
            <li className="bp">Indira Nagar</li>
            <li className="bp">KR Puram</li>
        </ul>
      </div>
    )
  }
}

export default Filter;