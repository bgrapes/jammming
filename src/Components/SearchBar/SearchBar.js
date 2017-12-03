import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleClearPlaceholder = this.handleClearPlaceholder.bind(this);
    this.handleReplacePlaceholder = this.handleReplacePlaceholder.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    event.preventDefault();
    this.setState({
      term: event.target.value
    });
  }

  handleClearPlaceholder(event) {
    event.preventDefault();
    event.target.placeholder = '';
  }

  handleReplacePlaceholder(event) {
    event.preventDefault();
    if (event.target.placeholder === '') {
      event.target.placeholder = 'Enter A Song, Album, or Artist';
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onFocus={this.handleClearPlaceholder} onBlur={this.handleReplacePlaceholder} onChange={this.handleTermChange} defaultValue={this.props.searchTerm} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;