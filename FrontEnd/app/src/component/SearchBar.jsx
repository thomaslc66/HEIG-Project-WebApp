import React, { Component } from 'react';
import AutoSuggest from 'react-autosuggest';
import Axios from 'axios';
import Suggestions from './Suggestions';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div className='resultat'>{suggestion.name}</div>
);

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      query: '',
      suggestions: [],
      results: []
    };
  }

  getInfo = () => {
    const newValue = this.state.query;
    Axios.get(`http://localhost:4000/suppliers/tag/${newValue}`).then(
      response => {
        console.log(response.data);
        this.setState({
          results: response.data
        });
      }
    );
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length >= 1) {
          this.getInfo();
        } else if (!this.search.query) {
          this.setState({ results: [] });
        }
      }
    );
  };

  render() {
    return (
      <form>
        <input
          placeholder='Search for...'
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

export default SearchBar;
