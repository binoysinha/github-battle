import '../styles/Popular.scss';
import React, { Component} from 'react';
import SelectLanguage from './dumbComponents/SelectLanguage';
//import RepoGrid from './dumbComponents/RepoGrid';
import api  from './utils/Api';
import Loading from './dumbComponents/Loading';

import PropTypes from 'prop-types';

const RepoGrid = (props) => {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default class Popular extends Component {

    state = {
        selectedLanguages: 'All',
        repos: null
    };

    componentDidMount() {
       this.updateLanguage(this.state.selectedLanguages);
    }

    updateLanguage = (lang) => {
        this.setState(prevState => ({
            selectedLanguages: lang,
            repos: null
        }));

        api.fetchPopularRepos(lang)
        .then((data) => {
            const repos = data.items;
            this.setState({ repos })

        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const Load = this.state.repos ? <RepoGrid repos={this.state.repos} /> : <Loading/>;
        return (
            <div className="page popular">
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguages} 
                    updateLanguage={this.updateLanguage}
                />
                {Load}
            </div>
        )
    }
}