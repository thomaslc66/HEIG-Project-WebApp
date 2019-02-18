import React, { Component } from "react";
import AutoSuggest from "react-autosuggest";
import Axios from "axios";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
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

  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  //call axios
  onChange = (event, { newValue }) => {
    Axios.get(`http://localhost:4000/suppliers/tag/${newValue}`).then(
      response => {
        this.setState({
          suggestions: response
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

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Entrer le nom d'un fournisseur",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <AutoSuggest
          className="searchBar"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default SearchBar;
