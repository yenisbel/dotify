import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Player from "../Player";

const { FETCH_PLAYLIST } = Queries;

class AlbumShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSong: ''
    }
  }

  render() {
    return (

      <Query query={FETCH_PLAYLIST}
        variables={{ id: this.props.match.params.id }}
      >

        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          console.log(data)
          return (
            <div>
              <ul>
                {data.playlist.songs.map((song) => (
                  <li key={song._id}>
                    <p onClick={e => this.setState({ currentSong: song })}>{song.title}</p>
                  </li>
                ))}
              </ul>
              <Player currentSong={this.state.currentSong} albumTitle={data.playlist} artistName={data.playlist.creator.username} />
            </div>
          )}}
      </Query>

    )
  }
};

export default AlbumShow;

//data.album.songs.url