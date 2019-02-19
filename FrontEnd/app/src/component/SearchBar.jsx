import React, { Component } from 'react';
import AutoSuggest from 'react-autosuggest';
import Axios from 'axios';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div className='resultat'>{suggestion.name}</div>
);

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(
          result =>
            result.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  //call axios
  onChange = (event, { newValue }) => {
    Axios.get(`http://localhost:4000/suppliers/tag/${newValue}`).then(
      response => {
        this.setState({
          suggestions: response.data
        });
      }
    );
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  displayResults = () => {
    return <div>hello</div>;
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Entrer le nom d'un fournisseur",
      value,
      onChange: this.onChange
    };

    return (
      <div className='searchBar'>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.displayResults}
        />
      </div>
    );
  }
}

export default SearchBar;
