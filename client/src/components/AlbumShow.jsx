import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
import Player from "./Player";
import gql from "graphql-tag";
import "../assets/stylesheets/albumShow.css";
import { ApolloClient } from 'apollo-client';



const { FETCH_ALBUM } = Queries;

class AlbumShow extends Component {
  constructor(props){
    super(props)
  }

  handlePlay(client, data, song){
    client.writeData({
      data: {
        currentAlbum: data.album,
        currentSong: song
      }
    })
  }

  handlePlayAlbum(client, data, song) {
    // console.log(data);
    client.writeData({
      data: {
        currentAlbum: data.album,
        currentSong: data.album.songs[0]
      }
    })
  }

  render(){ //react-apollo uses render prop pattern to share GraphQL data with the UI
    return (
      <ApolloConsumer>
        {(client) => {
          return <Query query={FETCH_ALBUM} variables={{id: this.props.match.params.id}}>
            {({ loading, error, data}) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return <div className="albumShow">
                  <div className="left-side">
                    <img className="left-album-cover" src={data.album.url}></img>
                    <p className="album-name">{data.album.name}</p>
                    <p className="left-artist-name">{data.album.artist.name}</p>
                    <p className="album-show-play-button" onClick={() => this.handlePlayAlbum(client, data)}>PLAY</p>
                    <p className="song-count">{data.album.songs.length} songs</p>
                  </div>
                  <div className="right-side">
                      <ul>
                          {data.album.songs.map((song) => (
                            <li key={song._id}>
                              <div className="songInfo">
                                <p onClick={e => this.handlePlay(client, data, song)}><i className="fab fa-itunes-note"></i></p>
                                <div className="songTitle-artist-name">
                                  <p className="albumshow-song-title" onClick={e => this.handlePlay(client, data, song)}>{song.title}</p>
                                  <p className="right-artist-name">{data.album.artist.name}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                  </div>
              </div>
            }}
          </Query>
        }}
      </ApolloConsumer>
      )
  }
};

export default AlbumShow;
