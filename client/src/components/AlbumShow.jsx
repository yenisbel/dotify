import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
import Player from "./Player";
import gql from "graphql-tag";
import "../assets/stylesheets/albumShow.css";
import { ApolloClient } from 'apollo-client';



const { FETCH_ALBUM} = Queries;

class AlbumShow extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentSong: ''
    }
  }

  handlePlay(client, data, song){
    console.log(song);
    client.writeData({
      data: {
        currentAlbum: data.album,
        currentSong: song
      }
    })
  }

  updateCache(client, data){
    // debugger;
    // console.log(album);
    // localStorage.setItem("albumName", album.name);
    // localStorage.setItem("albumUrl", album.url);
    // localStorage.setItem("artistName", album.artist.name);
    // console.log(data);
    // let album;
    // console.log(_APOLLO_CLIENT_.cache.InMemoryCache.data.data)
    
    // try{
    //   const album = client.readQuery({ query: FETCH_ALBUM });
    // } catch (err){
    //   return;
    // }

    // if (album){
    //   const newAlbum = data.data.newAlbum;
    //   cache.writeQuery({ query: FETCH_ALBUM})
    // }
  }

  // readCache(cache){
  //   let potato;
  //   try {
  //       potato = cache.readQuery({
  //       query: FETCH_ALBUM,
  //       variables: { id: this.props.match.params.id }
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   if (potato){
  //     console.log(potato)
  //   }
  // }

  render(){
    return (
      <ApolloConsumer>
        {(client) => {
          return <Query query={FETCH_ALBUM} variables={{id: this.props.match.params.id}}>
            {({ loading, error, data}) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              // console.log("hello")
              //data.album
              return <div className="albumShow">
                  <div className="left-side">
                    <img className="left-album-cover" src={data.album.url}></img>
                    <p className="album-name">{data.album.name}</p>
                    <p className="left-artist-name">{data.album.artist.name}</p>
                    <p className="album-show-play-button" onClick={e => this.handlePlay(client, data)}>PLAY</p>
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
                  {/* <Player currentSong={this.state.currentSong} albumTitle={data.album} artistName={data.album.artist.name}/> */}
              </div>
            }}
          </Query>
        }}
      </ApolloConsumer>
      )
  }
};

export default AlbumShow;

//data.album.songs.url

// onClick = { e => this.setState({ currentSong: song.url })