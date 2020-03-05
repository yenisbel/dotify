import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Queries from "../graphql/queries";

const { FETCH_ALBUM } = Queries;

class AlbumShow extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <ul>
          <Query query={FETCH_ALBUM}
          variables={{id: this.props.match.params.id}}>
              {({ loading, error, data}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                debugger;
                return data.album.songs.map((song) => (
                  <li key={song._id}>
                      <p>{song.title}</p>
                  </li>
                ));
              }}
          </Query>
        </ul>
      </div>
    )
  }
};

export default AlbumShow;

//data.album.songs.url