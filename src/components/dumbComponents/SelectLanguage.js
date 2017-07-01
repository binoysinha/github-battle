import React from 'react';
import PropTypes from 'prop-types';
import { languages } from '../../config/App-config';

const SelectLanguage = ({selectedLanguage ,updateLanguage}) => {
    return (
        <div>
            <ul className='popular-navbar'>
                {languages.map(lang => {
                    return (
                        <li 
                            style={lang === selectedLanguage ? { color: '#d0021b'} : null}
                            onClick={updateLanguage.bind(null,lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )    
                })}
            </ul>
        </div>
    );
}

SelectLanguage.PropTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    updateLanguage: PropTypes.string.isRequired
}

export default SelectLanguage;