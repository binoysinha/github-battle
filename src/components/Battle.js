import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './dumbComponents/PlayerPreview';
import api  from './utils/Api';

class PlayerInput extends Component {
    state = {
        username: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event Submit', this.state.username);
        api.fetchUserName(this.state.username)
            .then(response => {
                console.log(response);
                this.props.onSubmit(this.props.id, response);
            }).catch(function (err) {
            // Error :(
        });

    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{this.props.label}</label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    value={this.state.username}
                    autoComplete='off'
                    onChange={(event) => this.setState({username: event.target.value})}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                        Submit
                </button>
            </form>
        )
    }
}

PlayerInput.PropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username',
}

export default class Badge extends Component {

    state = {
        playerOneName: '',
        playerTwoName: '',
        playerOneImage: null,
        playerTwoImage: null
    }

    handleSubmit = (id, data) => {
        this.setState(prevState => ({
            [id + 'Name']: data.login,
            [id + 'Image']: data.avatar_url
        }));
    }

    handleReset = (id) => {
        this.setState(prevState => ({
            [id + 'Name']: '',
            [id + 'Image']: null
        }));
    }

    render() {

        const { 
            playerOneName, 
            playerTwoName,
            playerOneImage,
            playerTwoImage
         } = this.state;

         const match = this.props.match;

        return (
            <div className="page battle">
                <div className='row'>
                {!playerOneName &&
                    <PlayerInput
                    id='playerOne'
                    label='Player One'
                    onSubmit={this.handleSubmit}
                    />}

                {playerOneImage !== null &&
                    <PlayerPreview
                    avatar={playerOneImage}
                    username={playerOneName}>
                        <button
                        className='reset'
                        onClick={this.handleReset.bind(this, 'playerOne')}>
                            Reset
                        </button>
                    </PlayerPreview>}

                {!playerTwoName &&
                    <PlayerInput
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit}
                    />}

                {playerTwoImage !== null &&
                    <PlayerPreview
                    avatar={playerTwoImage}
                    username={playerTwoName}>
                        <button
                        className='reset'
                        onClick={this.handleReset.bind(this, 'playerTwo')}>
                            Reset
                        </button>
                    </PlayerPreview>}
                </div>

                {playerOneImage && playerTwoImage &&
                <Link
                    className='button'
                    to={{
                    pathname: match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                    }}>
                    Battle
                </Link>}
                
            </div>
        )
    }
}


