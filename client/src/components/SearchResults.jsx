import React, { Component } from 'react'
import Queries from "../graphql/queries";
import { Query } from "react-apollo";
import Item from "./Item";
import { withRouter } from 'react-router-dom';
const { SEARCH } = Queries;

class SearchResults extends Component {
  render() {
    return (
      <section className="populars">
        <h2>Search Results</h2>
        <Query 
          query={SEARCH}
          variables={{ filter: this.props.match.params.filter }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            let albums;
            if (data) {
              albums = data.search.filter(obj => (
                obj.__typename === "AlbumType"
              ));
            } else {
              albums = [];
            }
            return (
              <div className="content-container">
                {albums.map(album => {
                  return <Item key={album._id} album={album} />
                })}
              </div>
            )
          }}
        </Query>
      </section>
    )
  }
}

export default withRouter(SearchResults);
