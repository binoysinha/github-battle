import React, { Component } from "react";
import qs from 'query-string';
import api from './utils/Api';
import Player from './dumbComponents/Player';
import Loading from './dumbComponents/Loading';

export default class Results extends Component {

    state = {
        winner: null,
        loser: null,
        loading: true
    }
    componentDidMount() {
        const {playerOneName, playerTwoName} = qs.parse(this.props.location.search);
        api.battle(playerOneName, playerTwoName)
            .then(results => {
                console.log(results);
                this.setState(prevState => ({
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }));
            })
    }

    render () {
        const {
            winner,
            loser,
            loading
        } = this.state;
        console.log(winner);
        if(loading) {
            return <Loading/>
        }
        return (
            <div className='page result'>
                <div className='row'>
                    <Player
                        label='Winner'
                        score={winner.score}
                        profile={winner.profile}
                    />
                    <Player
                        label='Loser'
                        score={loser.score}
                        profile={loser.profile}
                    />
                </div>    
            </div>
        )
    }
}