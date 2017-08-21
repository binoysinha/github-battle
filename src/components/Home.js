import React, { Component } from "react";
import { Link } from 'react-router-dom';
import SeatLayout from './SeatLayout/components/seatLayout.js';
import Filter from './Filter/components/Filter';
import { seatNo, fbConfig} from './data';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import axios from 'axios';
import BusInfo from './BusInfo/components/BusInfo';


class Home extends Component {
  constructor(props) {
    super(props);

    const config = fbConfig;
	this.databaseRef1 = this.props.database.ref().child('column1');
	this.databaseRef2 = this.props.database.ref().child('column2');
	this.items = [];
    this.state = {
		column1:'',
		column2:''
	}
  }

  componentWillMount() {
	this.updateLocalState();
  
  }

  updateLocalState = () => {
	// axios.get('https://buscheckin-76ca3.firebaseio.com/column1.json')
	// .then((response) => {
	// 	this.setState({column1: response.data});
	// })
	this.databaseRef1.on('value', snapshot => {
		const seatArray = [];
		snapshot.forEach((snap) => {
			seatArray.push(snap.val())
		})
		this.setState({column1: seatArray});
	  });

	  this.databaseRef2.on('value', snapshot => {
		const seatArray = [];
		snapshot.forEach((snap) => {
			seatArray.push(snap.val())
		})
		this.setState({column2: seatArray});
	  });
  

	// axios.get('https://buscheckin-76ca3.firebaseio.com/column2.json')
	// .then((response) => {
	// 	this.setState({column2: response.data});
	// })
  }
  
  openFilter =() => {
	document.querySelector('.filter-block').classList.toggle('hide');
	document.querySelector('.overlay').classList.toggle('hide');
  }

  filterBP = (selectedBp) => {
	const reset1 = this.state.column1.map(val => {
		if (val.filteredBp) {
			delete val.filteredBp
		}
		return val
	});
	const reset2 = this.state.column2.map(val => {
		if (val.filteredBp) {
			delete val.filteredBp
		}
		return val
	});

	this.setState({column2: reset1});
	this.setState({column1: reset2});
    
	const bp1 = this.state.column1.map(val => {
		if (val.bp === selectedBp) {
			val.filteredBp = 'filteredSeats';
		}
		return val
	});
	const bp2 = this.state.column2.map(val => {
		if (val.bp === selectedBp) {
			val.filteredBp = 'filteredSeats';
		}
		return val
	});
	document.querySelector('.filter-block').classList.toggle('hide');
	document.querySelector('.overlay').classList.toggle('hide');
	
	this.setState({column2: bp2});
	this.setState({column1: bp1});
  }

  hideFilter = () => {
	document.querySelector('.filter-block').classList.toggle('hide');
	document.querySelector('.overlay').classList.toggle('hide');
  }

  updateData = () => {
	var query = this.props.database.ref("column1/0/status").set("checked-in");
	this.updateLocalState();
  }

  render() {
    return (
      <div>
		<div className="filter" onClick={this.openFilter}></div>
		<BusInfo />
		{this.state.column1.length === 10 && this.state.column2.length === 10 &&
        <SeatLayout column1={this.state.column1} column2={this.state.column2} />
		}
		<Filter filter={this.filterBP}/>
		<div className="overlay hide" onClick={this.hideFilter}></div>
      </div>
    );
  }
}

export default Home;

