import React, { Component } from 'react';
import './SearchBar.css';
import { MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import {
  runSearch,
  onChange,
  onSuggestionsClearRequested,
  onSuggestionsFetchRequested,
  onEraseSearchValue,
} from '../../redux/actions/contact-actions';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { SEARCH } from '../../utils/string';
import { Intent } from '@blueprintjs/core';

function renderSuggestion({ name, ...suggestion }, { query }) {
  const matches = AutosuggestHighlightMatch(name, query);
  const parts = AutosuggestHighlightParse(name, matches);
  return (
    <span className={'suggestion-content '}>
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? 'highlight' : null;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}

class SearchBar extends Component {
  getSuggestionValue = suggestion => suggestion.name;

  onSuggestionSelected = (event, { suggestionValue }) => {
    if (this.props.isNewContactOn) {
      this.props.renderToaster(
        Intent.WARNING,
        "Ajout de contact en cours. Merci d'annuler ou terminer"
      );
    } else if (this.props.isEditingOn) {
      this.props.renderToaster(
        Intent.WARNING,
        'Edition du contact en cours. Merci de terminer'
      );
    } else {
      this.props.onRunSearch(suggestionValue);
    }
  };

  eraseSearchValue = () => {
    if (this.props.isEditingOn) {
      this.props.renderToaster(
        Intent.WARNING,
        'Edition du contact en cours. Merci de terminer'
      );
    } else {
      this.props.eraseSearchValue();
    }
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      if (this.props.isNewContactOn) {
        this.props.renderToaster(
          Intent.WARNING,
          "Ajout de contact en cours. Merci d'annuler ou terminer"
        );
      } else if (this.props.isEditingOn) {
        this.props.renderToaster(
          Intent.WARNING,
          'Edition du contact en cours. Merci de terminer'
        );
      } else {
        this.props.onRunSearch(e.target.value);
      }
    }
  };

  render() {
    const {
      value,
      suggestions,
      onChange,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
    } = this.props;

    const inputProps = {
      placeholder: SEARCH,
      value,
      onChange,
      onKeyPress: this.onKeyPress,
    };

    return (
      <div className="searchBar">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        {value ? (
          <MDBIcon
            className="eraseIcon"
            icon="times"
            onClick={this.eraseSearchValue}
          />
        ) : (
          <MDBIcon className="searchIcon" icon="search" />
        )}
      </div>
    );
  }
}

/* Redux Management */
const mapStateToProps = state => ({
  allContactName: state.contact.allContactName,
  value: state.contact.value,
  suggestions: state.contact.suggestions,
  isNewContactOn: state.contact.isNewContactOn,
  isEditingOn: state.contact.isEditingOn,
});

const mapActionToProps = {
  onRunSearch: runSearch,
  onChange: onChange,
  onSuggestionsFetchRequested: onSuggestionsFetchRequested,
  onSuggestionsClearRequested: onSuggestionsClearRequested,
  eraseSearchValue: onEraseSearchValue,
};

/* Component Export */
export default connect(
  mapStateToProps,
  mapActionToProps
)(SearchBar);
