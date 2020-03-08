import React, { Component } from 'react';
import Queries from '../graphql/queries';
const { SEARCH } = Queries;

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
        <input
          type="text"
          value={this.state.filter}
          onChange={this.handleChange}
          className="search-bar"
        >
        </input>
      </form>
    )
  }
}
