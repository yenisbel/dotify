import React, { Component } from 'react';
import "../assets/stylesheets/searchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ filter: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.filter}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-bar-container">
          <i className="fas fa-search search-bar-icon"></i>
          <input
            type="text"
            value={this.state.filter}
            onChange={this.handleChange}
            className="search-bar"
            placeholder="Type 3+ characters and press enter to search"
          >
          </input>
        </div>
      </form>
    )
  }
}
